/* eslint-disable complexity */
/* eslint-disable max-depth */
export type InsertPosition = [number, number, number, number];

export class TagInserter {
    /** The original xml string, e.g. <a>xxx<b>yyy</b>zzz<a> */
    private xmlString!: string;
    /** The start tag to be inserted, e.g. <mark style="color:ref"> */
    private startTag!: string;
    private insertStartTags!: string[];
    /** The end tag to be inserted, e.g. </mark> */
    private endTag!: string;
    /** The endTag list to be inserted */
    private insertEndTags!: string[];
    /** The start and end position to insert tag */
    private insertPosition!: InsertPosition;
    /** The tag stack of current walked xmlString */
    private tagStack: string[] = [];
    /** The current line of walked xmlString */
    private currentLine = 0;
    /** The current column of walked xmlString (with tag removed) */
    private currentColumn = 0;
    /** The insert index of start tag */
    private startInsertIndex = -1;
    /** The insert index of end tag */
    private endInsertIndex = -1;
    /** The stack length inside position, might be negative integer */
    private insideStackLength = 0;

    /**
     * Insert tag to the specific position of a xml/html string
     * @param xmlString The original xml string, e.g. <a>xxxxx<b>yyyyy</b>zzzzz<a>
     * @param startTag The start tag to be inserted, e.g. <mark style="color:ref">
     * @param insertPosition The start and end position to insert tag
     */
    public insertTag(xmlString: string, startTag: string, insertPosition: InsertPosition) {
        this.reset(xmlString, startTag, insertPosition);
        for (let i = 0; i < this.xmlString.length; i++) {
            // 匹配上结束位置
            if (
                this.currentLine === this.insertPosition[2] &&
                this.currentColumn === this.insertPosition[3]
            ) {
                this.endInsertIndex = i;
                break;
            }
            // 进入标签内部，直到 > 之前都会在里面循环
            if (this.xmlString[i] === '<') {
                // 是开始标签
                if (this.xmlString[i + 1] !== '/') {
                    let j = i + 1;
                    while (this.xmlString[j] !== '>') {
                        j++;
                    }
                    // 已匹配到开始位置之后了
                    if (this.startInsertIndex >= 0) {
                        this.insideStackLength++;
                    }
                    this.tagStack.push(this.xmlString.slice(i, j + 1));
                    i = j;
                    continue;
                }
                // 是闭合标签
                else {
                    i = i + 2;
                    while (this.xmlString[i] !== '>') {
                        i++;
                    }
                    // 已匹配到开始位置之后了
                    if (this.startInsertIndex >= 0) {
                        this.insideStackLength--;
                        // 栈长度为负数，需要给 insertMark 添加标签
                        if (this.insideStackLength < 0) {
                            // 开始插入位置之前是一个开始标签，则将开始位置往前移
                            if (this.xmlString[this.startInsertIndex - 1] === '>') {
                                this.startInsertIndex =
                                    this.startInsertIndex -
                                    this.tagStack[this.tagStack.length - 1].length;
                                this.insideStackLength++;
                            } else {
                                const currentTag = this.tagStack[
                                    this.tagStack.length + this.insideStackLength
                                ];
                                this.insideStackLength++;
                                this.insertStartTags.splice(
                                    (this.insertStartTags.length + 1) / 2,
                                    0,
                                    currentTag
                                );
                                this.insertStartTags.splice(
                                    (this.insertStartTags.length - 2) / 2,
                                    0,
                                    currentTag.replace(/<([^ ]+).+/, '</$1>')
                                );
                            }
                        }
                    }
                    this.tagStack.pop();
                    continue;
                }
            }
            // 如果还没有确定开始位置，并且下一个字符不是 < 也不是 \n，则开始判断是不是开始位置
            if (
                this.startInsertIndex === -1 &&
                this.xmlString[i] !== '<' &&
                this.xmlString[i] !== '\n'
            ) {
                // 匹配上开始位置
                if (
                    this.currentLine === this.insertPosition[0] &&
                    this.currentColumn === this.insertPosition[1]
                ) {
                    this.startInsertIndex = i;
                }
            }
            // 遇到换行符，行数加一
            if (this.xmlString[i] === '\n') {
                this.currentLine++;
                this.currentColumn = 0;
                continue;
            }
            // 不在标签内部，列数加一
            this.currentColumn++;
        }
        // 栈长度为正数，需要给 endInsertMark 添加标签
        while (this.insideStackLength > 0) {
            const topTag = this.tagStack.pop() as string;
            // 结束插入位置之后是一个结束标签，则将结束位置往后移
            if (this.xmlString[this.endInsertIndex] === '<') {
                this.endInsertIndex = this.endInsertIndex + this.getEndTag(topTag).length;
            } else {
                this.insertEndTags.splice((this.insertEndTags.length + 1) / 2, 0, topTag);
                this.insertEndTags.splice(
                    (this.insertEndTags.length - 2) / 2,
                    0,
                    topTag.replace(/<([^ ]+).+/, '</$1>')
                );
            }
            this.insideStackLength--;
        }
        if (this.endInsertIndex === -1) {
            this.endInsertIndex = this.xmlString.length;
        }
        // 真正开始插入
        return (
            this.xmlString.slice(0, this.startInsertIndex) +
            this.insertStartTags.join('') +
            this.xmlString.slice(this.startInsertIndex, this.endInsertIndex) +
            this.insertEndTags.join('') +
            this.xmlString.slice(this.endInsertIndex)
        );
    }

    private reset(xmlString: string, startTag: string, insertPosition: InsertPosition) {
        this.xmlString = xmlString;
        this.startTag = startTag;
        this.insertStartTags = [this.startTag];
        this.endTag = this.getEndTag(this.startTag);
        this.insertEndTags = [this.endTag];
        this.insertPosition = insertPosition;
        this.tagStack = [];
        this.currentLine = 0;
        this.currentColumn = 0;
        this.startInsertIndex = -1;
        this.endInsertIndex = -1;
        this.insideStackLength = 0;
    }
    private getEndTag(startTag: string) {
        return startTag.replace(/<([^ ]+).+/, '</$1>');
    }
}

const tagInserter = new TagInserter();
const insertTag = tagInserter.insertTag.bind(tagInserter);

export default insertTag;

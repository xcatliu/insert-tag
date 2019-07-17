"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TagInserter {
    constructor() {
        /** The tag stack of current walked xmlString */
        this.leftTagStack = [];
        this.insideTagStack = [];
        this.rightTagStack = [];
        /** The current line of walked xmlString */
        this.currentLine = 0;
        /** The current column of walked xmlString (with tag removed) */
        this.currentColumn = 0;
        /** The insert index of start tag */
        this.startInsertIndex = -1;
        /** The insert index of end tag */
        this.endInsertIndex = -1;
        /** Escaped strings replaced by placeholder */
        this.replacedList = [];
    }
    /**
     * Insert tag to the specific position of a xml/html string
     * @param xmlString The original xml string, e.g. <a>xxxxx<b>yyyyy</b>zzzzz<a>
     * @param startTag The start tag to be inserted, e.g. <mark style="color:ref">
     * @param insertPosition The start and end position to insert tag
     */
    insertTag(xmlString, startTag, insertPosition) {
        this.reset(xmlString, startTag, insertPosition);
        this.replaceEscapedStrings();
        this.parseXmlString();
        this.walkInsideTagStack();
        this.insertStartEndTag();
        this.replaceEscapedStringsBack();
        return this.xmlString;
    }
    /** replace escaped strings (e.g. &amp;) to ￿ */
    replaceEscapedStrings() {
        this.xmlString = this.xmlString.replace(/&.+?;/g, (matched) => {
            this.replacedList.push(matched);
            return TagInserter.replacer;
        });
    }
    /** replace ￿ to escaped strings (e.g. &amp;) */
    replaceEscapedStringsBack() {
        this.xmlString = this.xmlString.replace(new RegExp(TagInserter.replacer, 'g'), () => {
            return this.replacedList.shift();
        });
    }
    /** Parse xmlString, get tagStack, insertIndex, e.g. */
    parseXmlString() {
        let tagStack = this.leftTagStack;
        let level = 0;
        for (let i = 0; i < this.xmlString.length + 1; i++) {
            // 已匹配上开始位置 && 还没有确定结束位置 && 匹配上结束位置
            if (this.startInsertIndex >= 0 &&
                this.endInsertIndex === -1 &&
                this.currentLine === this.insertPosition[2] &&
                this.currentColumn === this.insertPosition[3]) {
                this.endInsertIndex = i;
                tagStack = this.rightTagStack;
                level = 0;
            }
            // 进入标签内部，直到 > 之前都会在里面循环
            if (this.xmlString[i] === '<') {
                let j = i + 1;
                while (this.xmlString[j] !== '>') {
                    j++;
                }
                const tag = this.xmlString.slice(i, j + 1);
                if (this.isStartTag(tag)) {
                    tagStack.push(tag);
                    level++;
                }
                else if (this.isEndTag(tag) && level > 0) {
                    tagStack.pop();
                    level--;
                }
                else if (this.isEndTag(tag) && level === 0) {
                    tagStack.push(tag);
                }
                i = j;
                continue;
            }
            // 还没有确定开始位置 && 匹配上开始位置 && 当前字符不是 < 也不是 \n
            if (this.startInsertIndex === -1 &&
                this.currentLine === this.insertPosition[0] &&
                this.currentColumn === this.insertPosition[1] &&
                this.xmlString[i] !== '<' &&
                this.xmlString[i] !== '\n') {
                this.startInsertIndex = i;
                tagStack = this.insideTagStack;
                level = 0;
            }
            if (this.xmlString[i] === '\n') {
                this.currentLine++;
                this.currentColumn = 0;
            }
            else {
                this.currentColumn++;
            }
        }
    }
    walkInsideTagStack() {
        this.insideTagStack.filter(this.isEndTag.bind(this)).forEach((tag) => {
            const startTag = this.leftTagStack.pop();
            const endTag = tag;
            if (this.xmlString[this.startInsertIndex - 1] === '>' &&
                this.isWalkBackStartTag(this.startInsertIndex - 1)) {
                this.startInsertIndex -= startTag.length;
            }
            else {
                this.xmlString =
                    this.xmlString.slice(0, this.startInsertIndex) +
                        endTag +
                        startTag +
                        this.xmlString.slice(this.startInsertIndex);
                this.startInsertIndex += endTag.length;
                this.endInsertIndex += endTag.length + startTag.length;
            }
        });
        this.insideTagStack
            .reverse()
            .filter(this.isStartTag.bind(this))
            .forEach((tag) => {
            const startTag = tag;
            const endTag = this.rightTagStack.shift();
            if (this.xmlString[this.endInsertIndex] === '<' &&
                this.xmlString[this.endInsertIndex + 1] === '/') {
                this.endInsertIndex += endTag.length;
            }
            else {
                this.xmlString =
                    this.xmlString.slice(0, this.endInsertIndex) +
                        endTag +
                        startTag +
                        this.xmlString.slice(this.endInsertIndex);
                this.endInsertIndex += endTag.length;
            }
        });
    }
    insertStartEndTag() {
        this.xmlString =
            this.xmlString.slice(0, this.startInsertIndex) +
                this.startTag +
                this.xmlString.slice(this.startInsertIndex, this.endInsertIndex) +
                this.endTag +
                this.xmlString.slice(this.endInsertIndex);
    }
    isWalkBackStartTag(index) {
        let i = index;
        while (this.xmlString[i] !== '<') {
            i--;
        }
        return this.xmlString[i + 1] !== '/';
    }
    reset(xmlString, startTag, insertPosition) {
        this.xmlString = xmlString;
        this.startTag = startTag;
        this.endTag = this.getEndTag(this.startTag);
        this.insertPosition = insertPosition;
        this.leftTagStack = [];
        this.insideTagStack = [];
        this.rightTagStack = [];
        this.currentLine = 0;
        this.currentColumn = 0;
        this.startInsertIndex = -1;
        this.endInsertIndex = -1;
    }
    getEndTag(startTag) {
        return startTag.replace(/<([^ ]+).+/, '</$1>');
    }
    isStartTag(tag) {
        return !tag.startsWith('</');
    }
    isEndTag(tag) {
        return tag.startsWith('</');
    }
}
/**
 * replace escaped strings (e.g. &amp;) to ￿
 * https://unicode-table.com/en/FFFF/
 */
TagInserter.replacer = '￿';
exports.TagInserter = TagInserter;
const tagInserter = new TagInserter();
const insertTag = tagInserter.insertTag.bind(tagInserter);
exports.default = insertTag;
//# sourceMappingURL=index.js.map
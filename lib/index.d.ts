export declare type InsertPosition = [number, number, number, number];
export declare class TagInserter {
    /** The original xml string, e.g. <a>xxx<b>yyy</b>zzz<a> */
    private xmlString;
    /** The start tag to be inserted, e.g. <mark style="color:ref"> */
    private startTag;
    /** The end tag to be inserted, e.g. </mark> */
    private endTag;
    /** The start and end position to insert tag */
    private insertPosition;
    /** The tag stack of current walked xmlString */
    private leftTagStack;
    private insideTagStack;
    private rightTagStack;
    /** The current line of walked xmlString */
    private currentLine;
    /** The current column of walked xmlString (with tag removed) */
    private currentColumn;
    /** The insert index of start tag */
    private startInsertIndex;
    /** The insert index of end tag */
    private endInsertIndex;
    /**
     * Insert tag to the specific position of a xml/html string
     * @param xmlString The original xml string, e.g. <a>xxxxx<b>yyyyy</b>zzzzz<a>
     * @param startTag The start tag to be inserted, e.g. <mark style="color:ref">
     * @param insertPosition The start and end position to insert tag
     */
    insertTag(xmlString: string, startTag: string, insertPosition: InsertPosition): string;
    /** Parse xmlString, get tagStack, insertIndex, e.g. */
    private parseXmlString;
    private walkInsideTagStack;
    private insertStartEndTag;
    private isWalkBackStartTag;
    private reset;
    private getEndTag;
    private isStartTag;
    private isEndTag;
}
declare const insertTag: (xmlString: string, startTag: string, insertPosition: [number, number, number, number]) => string;
export default insertTag;

import insertTag from '../src';
import { expect } from 'chai';

let mark = '<mark>';

describe('insertTag', () => {
    it('no tag in xml string', () => {
        let xmlString = 'xxx';
        expect(insertTag(xmlString, mark, [0, 0, 0, 1])).to.equal('<mark>x</mark>xx');
        expect(insertTag(xmlString, mark, [0, 0, 0, 2])).to.equal('<mark>xx</mark>x');
        expect(insertTag(xmlString, mark, [0, 0, 0, 3])).to.equal('<mark>xxx</mark>');
        expect(insertTag(xmlString, mark, [0, 1, 0, 2])).to.equal('x<mark>x</mark>x');
        expect(insertTag(xmlString, mark, [0, 1, 0, 3])).to.equal('x<mark>xx</mark>');
        expect(insertTag(xmlString, mark, [0, 2, 0, 3])).to.equal('xx<mark>x</mark>');
    });
    it('<a>xxx</a>', () => {
        let xmlString = '<a>xxx</a>';
        expect(insertTag(xmlString, mark, [0, 0, 0, 1])).to.equal('<a><mark>x</mark>xx</a>');
        expect(insertTag(xmlString, mark, [0, 0, 0, 2])).to.equal('<a><mark>xx</mark>x</a>');
        expect(insertTag(xmlString, mark, [0, 0, 0, 3])).to.equal('<a><mark>xxx</mark></a>');
        expect(insertTag(xmlString, mark, [0, 1, 0, 2])).to.equal('<a>x<mark>x</mark>x</a>');
        expect(insertTag(xmlString, mark, [0, 1, 0, 3])).to.equal('<a>x<mark>xx</mark></a>');
        expect(insertTag(xmlString, mark, [0, 2, 0, 3])).to.equal('<a>xx<mark>x</mark></a>');
    });
    it('tag with attribute', () => {
        expect(insertTag('<a>xxx</a>', '<mark style="color: red;">', [0, 0, 0, 1])).to.equal(
            '<a><mark style="color: red;">x</mark>xx</a>'
        );
    });
    it('<a>xxx</a>yyy', () => {
        let xmlString = '<a>xxx</a>yyy';
        expect(insertTag(xmlString, mark, [0, 0, 0, 3])).to.equal('<a><mark>xxx</mark></a>yyy');
        expect(insertTag(xmlString, mark, [0, 0, 0, 4])).to.equal('<mark><a>xxx</a>y</mark>yy');
        expect(insertTag(xmlString, mark, [0, 0, 0, 5])).to.equal('<mark><a>xxx</a>yy</mark>y');
        expect(insertTag(xmlString, mark, [0, 0, 0, 6])).to.equal('<mark><a>xxx</a>yyy</mark>');
        expect(insertTag(xmlString, mark, [0, 1, 0, 4])).to.equal(
            '<a>x</a><mark><a>xx</a>y</mark>yy'
        );
        expect(insertTag(xmlString, mark, [0, 2, 0, 5])).to.equal(
            '<a>xx</a><mark><a>x</a>yy</mark>y'
        );
        expect(insertTag(xmlString, mark, [0, 3, 0, 6])).to.equal('<a>xxx</a><mark>yyy</mark>');
    });
    it('<a style="color: red;">xxx</a>yyy', () => {
        let xmlString = '<a style="color: red;">xxx</a>yyy';
        expect(insertTag(xmlString, mark, [0, 0, 0, 4])).to.equal(
            '<mark><a style="color: red;">xxx</a>y</mark>yy'
        );
        expect(insertTag(xmlString, mark, [0, 1, 0, 5])).to.equal(
            '<a style="color: red;">x</a><mark><a style="color: red;">xx</a>yy</mark>y'
        );
    });
    it('xxx<a>yyy</a>', () => {
        let xmlString = 'xxx<a>yyy</a>';
        expect(insertTag(xmlString, mark, [0, 0, 0, 3])).to.equal('<mark>xxx</mark><a>yyy</a>');
        expect(insertTag(xmlString, mark, [0, 0, 0, 4])).to.equal(
            '<mark>xxx<a>y</a></mark><a>yy</a>'
        );
        expect(insertTag(xmlString, mark, [0, 0, 0, 5])).to.equal(
            '<mark>xxx<a>yy</a></mark><a>y</a>'
        );
        expect(insertTag(xmlString, mark, [0, 0, 0, 6])).to.equal('<mark>xxx<a>yyy</a></mark>');
        expect(insertTag(xmlString, mark, [0, 1, 0, 4])).to.equal(
            'x<mark>xx<a>y</a></mark><a>yy</a>'
        );
        expect(insertTag(xmlString, mark, [0, 1, 0, 6])).to.equal('x<mark>xx<a>yyy</a></mark>');
        expect(insertTag(xmlString, mark, [0, 2, 0, 3])).to.equal('xx<mark>x</mark><a>yyy</a>');
        expect(insertTag(xmlString, mark, [0, 3, 0, 5])).to.equal('xxx<a><mark>yy</mark>y</a>');
        expect(insertTag(xmlString, mark, [0, 3, 0, 6])).to.equal('xxx<a><mark>yyy</mark></a>');
    });
    it('xxx<a style="color: red;">yyy</a>', () => {
        let xmlString = 'xxx<a style="color: red;">yyy</a>';
        expect(insertTag(xmlString, mark, [0, 0, 0, 4])).to.equal(
            '<mark>xxx<a style="color: red;">y</a></mark><a style="color: red;">yy</a>'
        );
        expect(insertTag(xmlString, mark, [0, 0, 0, 6])).to.equal(
            '<mark>xxx<a style="color: red;">yyy</a></mark>'
        );
        expect(insertTag(xmlString, mark, [0, 1, 0, 6])).to.equal(
            'x<mark>xx<a style="color: red;">yyy</a></mark>'
        );
        expect(insertTag(xmlString, mark, [0, 3, 0, 6])).to.equal(
            'xxx<a style="color: red;"><mark>yyy</mark></a>'
        );
    });
    it('xxx<a>yyy</a>zzz', () => {
        let xmlString = 'xxx<a>yyy</a>zzz';
        expect(insertTag(xmlString, mark, [0, 0, 0, 4])).to.equal(
            '<mark>xxx<a>y</a></mark><a>yy</a>zzz'
        );
        expect(insertTag(xmlString, mark, [0, 1, 0, 5])).to.equal(
            'x<mark>xx<a>yy</a></mark><a>y</a>zzz'
        );
        expect(insertTag(xmlString, mark, [0, 2, 0, 6])).to.equal('xx<mark>x<a>yyy</a></mark>zzz');
        expect(insertTag(xmlString, mark, [0, 3, 0, 7])).to.equal('xxx<mark><a>yyy</a>z</mark>zz');
        expect(insertTag(xmlString, mark, [0, 4, 0, 8])).to.equal(
            'xxx<a>y</a><mark><a>yy</a>zz</mark>z'
        );
        expect(insertTag(xmlString, mark, [0, 5, 0, 9])).to.equal(
            'xxx<a>yy</a><mark><a>y</a>zzz</mark>'
        );
        expect(insertTag(xmlString, mark, [0, 4, 0, 5])).to.equal('xxx<a>y<mark>y</mark>y</a>zzz');
        expect(insertTag(xmlString, mark, [0, 3, 0, 6])).to.equal('xxx<a><mark>yyy</mark></a>zzz');
        expect(insertTag(xmlString, mark, [0, 2, 0, 7])).to.equal('xx<mark>x<a>yyy</a>z</mark>zz');
    });
    it('qqq<a>xxx<b>yyy</b>zzz<a>ppp', () => {
        let xmlString = 'qqq<a>xxx<b>yyy</b>zzz</a>ppp';
        expect(insertTag(xmlString, mark, [0, 0, 0, 4])).to.equal(
            '<mark>qqq<a>x</a></mark><a>xx<b>yyy</b>zzz</a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 1, 0, 5])).to.equal(
            'q<mark>qq<a>xx</a></mark><a>x<b>yyy</b>zzz</a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 2, 0, 6])).to.equal(
            'qq<mark>q<a>xxx</a></mark><a><b>yyy</b>zzz</a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 3, 0, 7])).to.equal(
            'qqq<a><mark>xxx<b>y</b></mark><b>yy</b>zzz</a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 4, 0, 8])).to.equal(
            'qqq<a>x<mark>xx<b>yy</b></mark><b>y</b>zzz</a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 5, 0, 9])).to.equal(
            'qqq<a>xx<mark>x<b>yyy</b></mark>zzz</a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 6, 0, 10])).to.equal(
            'qqq<a>xxx<mark><b>yyy</b>z</mark>zz</a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 7, 0, 11])).to.equal(
            'qqq<a>xxx<b>y</b><mark><b>yy</b>zz</mark>z</a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 8, 0, 12])).to.equal(
            'qqq<a>xxx<b>yy</b><mark><b>y</b>zzz</mark></a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 9, 0, 13])).to.equal(
            'qqq<a>xxx<b>yyy</b></a><mark><a>zzz</a>p</mark>pp'
        );
        expect(insertTag(xmlString, mark, [0, 10, 0, 14])).to.equal(
            'qqq<a>xxx<b>yyy</b>z</a><mark><a>zz</a>pp</mark>p'
        );
        expect(insertTag(xmlString, mark, [0, 11, 0, 15])).to.equal(
            'qqq<a>xxx<b>yyy</b>zz</a><mark><a>z</a>ppp</mark>'
        );
        expect(insertTag(xmlString, mark, [0, 0, 0, 8])).to.equal(
            '<mark>qqq<a>xxx<b>yy</b></a></mark><a><b>y</b>zzz</a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 1, 0, 9])).to.equal(
            'q<mark>qq<a>xxx<b>yyy</b></a></mark><a>zzz</a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 2, 0, 10])).to.equal(
            'qq<mark>q<a>xxx<b>yyy</b>z</a></mark><a>zz</a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 3, 0, 11])).to.equal(
            'qqq<a><mark>xxx<b>yyy</b>zz</mark>z</a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 4, 0, 12])).to.equal(
            'qqq<a>x<mark>xx<b>yyy</b>zzz</mark></a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 5, 0, 13])).to.equal(
            'qqq<a>xx</a><mark><a>x<b>yyy</b>zzz</a>p</mark>pp'
        );
        expect(insertTag(xmlString, mark, [0, 6, 0, 14])).to.equal(
            'qqq<a>xxx</a><mark><a><b>yyy</b>zzz</a>pp</mark>p'
        );
        expect(insertTag(xmlString, mark, [0, 7, 0, 15])).to.equal(
            'qqq<a>xxx<b>y</b></a><mark><a><b>yy</b>zzz</a>ppp</mark>'
        );
    });
    it('qqq<a>xxx</a>yyy<b>zzz</b>ppp', () => {
        let xmlString = 'qqq<a>xxx</a>yyy<b>zzz</b>ppp';
        expect(insertTag(xmlString, mark, [0, 0, 0, 4])).to.equal(
            '<mark>qqq<a>x</a></mark><a>xx</a>yyy<b>zzz</b>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 1, 0, 5])).to.equal(
            'q<mark>qq<a>xx</a></mark><a>x</a>yyy<b>zzz</b>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 2, 0, 6])).to.equal(
            'qq<mark>q<a>xxx</a></mark>yyy<b>zzz</b>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 3, 0, 7])).to.equal(
            'qqq<mark><a>xxx</a>y</mark>yy<b>zzz</b>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 4, 0, 8])).to.equal(
            'qqq<a>x</a><mark><a>xx</a>yy</mark>y<b>zzz</b>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 5, 0, 9])).to.equal(
            'qqq<a>xx</a><mark><a>x</a>yyy</mark><b>zzz</b>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 6, 0, 10])).to.equal(
            'qqq<a>xxx</a><mark>yyy<b>z</b></mark><b>zz</b>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 7, 0, 11])).to.equal(
            'qqq<a>xxx</a>y<mark>yy<b>zz</b></mark><b>z</b>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 8, 0, 12])).to.equal(
            'qqq<a>xxx</a>yy<mark>y<b>zzz</b></mark>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 9, 0, 13])).to.equal(
            'qqq<a>xxx</a>yyy<mark><b>zzz</b>p</mark>pp'
        );
        expect(insertTag(xmlString, mark, [0, 10, 0, 14])).to.equal(
            'qqq<a>xxx</a>yyy<b>z</b><mark><b>zz</b>pp</mark>p'
        );
        expect(insertTag(xmlString, mark, [0, 11, 0, 15])).to.equal(
            'qqq<a>xxx</a>yyy<b>zz</b><mark><b>z</b>ppp</mark>'
        );
        expect(insertTag(xmlString, mark, [0, 0, 0, 8])).to.equal(
            '<mark>qqq<a>xxx</a>yy</mark>y<b>zzz</b>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 1, 0, 9])).to.equal(
            'q<mark>qq<a>xxx</a>yyy</mark><b>zzz</b>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 2, 0, 10])).to.equal(
            'qq<mark>q<a>xxx</a>yyy<b>z</b></mark><b>zz</b>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 3, 0, 11])).to.equal(
            'qqq<mark><a>xxx</a>yyy<b>zz</b></mark><b>z</b>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 4, 0, 12])).to.equal(
            'qqq<a>x</a><mark><a>xx</a>yyy<b>zzz</b></mark>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 5, 0, 13])).to.equal(
            'qqq<a>xx</a><mark><a>x</a>yyy<b>zzz</b>p</mark>pp'
        );
        expect(insertTag(xmlString, mark, [0, 6, 0, 14])).to.equal(
            'qqq<a>xxx</a><mark>yyy<b>zzz</b>pp</mark>p'
        );
        expect(insertTag(xmlString, mark, [0, 7, 0, 15])).to.equal(
            'qqq<a>xxx</a>y<mark>yy<b>zzz</b>ppp</mark>'
        );
    });
    it('qqq<a><b>xxx</b>yyy</a>ppp', () => {
        let xmlString = 'qqq<a><b>xxx</b>yyy</a>ppp';
        expect(insertTag(xmlString, mark, [0, 0, 0, 4])).to.equal(
            '<mark>qqq<a><b>x</b></a></mark><a><b>xx</b>yyy</a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 0, 0, 7])).to.equal(
            '<mark>qqq<a><b>xxx</b>y</a></mark><a>yy</a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 0, 0, 10])).to.equal(
            '<mark>qqq<a><b>xxx</b>yyy</a>p</mark>pp'
        );
        expect(insertTag(xmlString, mark, [0, 3, 0, 5])).to.equal(
            'qqq<a><b><mark>xx</mark>x</b>yyy</a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 3, 0, 8])).to.equal(
            'qqq<a><mark><b>xxx</b>yy</mark>y</a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 3, 0, 11])).to.equal(
            'qqq<mark><a><b>xxx</b>yyy</a>pp</mark>p'
        );
    });
    it('qqq<a>xxx<b>yyy</b></a>ppp', () => {
        let xmlString = 'qqq<a>xxx<b>yyy</b></a>ppp';
        expect(insertTag(xmlString, mark, [0, 0, 0, 4])).to.equal(
            '<mark>qqq<a>x</a></mark><a>xx<b>yyy</b></a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 0, 0, 7])).to.equal(
            '<mark>qqq<a>xxx<b>y</b></a></mark><a><b>yy</b></a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 0, 0, 10])).to.equal(
            '<mark>qqq<a>xxx<b>yyy</b></a>p</mark>pp'
        );
        expect(insertTag(xmlString, mark, [0, 3, 0, 5])).to.equal(
            'qqq<a><mark>xx</mark>x<b>yyy</b></a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 3, 0, 9])).to.equal(
            'qqq<a><mark>xxx<b>yyy</b></mark></a>ppp'
        );
        expect(insertTag(xmlString, mark, [0, 3, 0, 11])).to.equal(
            'qqq<mark><a>xxx<b>yyy</b></a>pp</mark>p'
        );
        expect(insertTag(xmlString, mark, [0, 2, 0, 9])).to.equal(
            'qq<mark>q<a>xxx<b>yyy</b></a></mark>ppp'
        );
    });
    it('<a>x\nxx</a>', () => {
        let xmlString = '<a>x\nxx</a>';
        expect(insertTag(xmlString, mark, [0, 0, 0, 1])).to.equal('<a><mark>x</mark>\nxx</a>');
        expect(insertTag(xmlString, mark, [0, 0, 1, 1])).to.equal('<a><mark>x\nx</mark>x</a>');
        expect(insertTag(xmlString, mark, [0, 0, 1, 2])).to.equal('<a><mark>x\nxx</mark></a>');
        expect(insertTag(xmlString, mark, [1, 0, 1, 1])).to.equal('<a>x\n<mark>x</mark>x</a>');
        expect(insertTag(xmlString, mark, [1, 0, 1, 2])).to.equal('<a>x\n<mark>xx</mark></a>');
        expect(insertTag(xmlString, mark, [1, 1, 1, 2])).to.equal('<a>x\nx<mark>x</mark></a>');
    });
});

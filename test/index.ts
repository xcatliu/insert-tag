import insertTag from '../src';
import { expect } from 'chai';

let mark = '<mark>';

describe('insertTag', () => {
    // it('no tag in xml string', () => {
    //     let xmlString = 'xxx';
    //     expect(insertTag(xmlString, mark, [0, 0, 0, 1])).to.equal('<mark>x</mark>xx');
    //     expect(insertTag(xmlString, mark, [0, 0, 0, 2])).to.equal('<mark>xx</mark>x');
    //     expect(insertTag(xmlString, mark, [0, 0, 0, 3])).to.equal('<mark>xxx</mark>');
    //     expect(insertTag(xmlString, mark, [0, 1, 0, 2])).to.equal('x<mark>x</mark>x');
    //     expect(insertTag(xmlString, mark, [0, 1, 0, 3])).to.equal('x<mark>xx</mark>');
    //     expect(insertTag(xmlString, mark, [0, 2, 0, 3])).to.equal('xx<mark>x</mark>');
    // });
    // it('simple tag in xml string', () => {
    //     let xmlString = '<a>xxx</a>';
    //     expect(insertTag(xmlString, mark, [0, 0, 0, 1])).to.equal('<a><mark>x</mark>xx</a>');
    //     expect(insertTag(xmlString, mark, [0, 0, 0, 2])).to.equal('<a><mark>xx</mark>x</a>');
    //     expect(insertTag(xmlString, mark, [0, 0, 0, 3])).to.equal('<a><mark>xxx</mark></a>');
    //     expect(insertTag(xmlString, mark, [0, 1, 0, 2])).to.equal('<a>x<mark>x</mark>x</a>');
    //     expect(insertTag(xmlString, mark, [0, 1, 0, 3])).to.equal('<a>x<mark>xx</mark></a>');
    //     expect(insertTag(xmlString, mark, [0, 2, 0, 3])).to.equal('<a>xx<mark>x</mark></a>');
    // });
    // it('tag with attribute', () => {
    //     expect(insertTag('<a>xxx</a>', '<mark style="color: red;">', [0, 0, 0, 1])).to.equal(
    //         '<a><mark style="color: red;">x</mark>xx</a>'
    //     );
    // });
    // it('<a>xxx</a>yyy', () => {
    //     let xmlString = '<a>xxx</a>yyy';
    //     expect(insertTag(xmlString, mark, [0, 0, 0, 3])).to.equal('<a><mark>xxx</mark></a>yyy');
    //     expect(insertTag(xmlString, mark, [0, 0, 0, 4])).to.equal('<mark><a>xxx</a>y</mark>yy');
    //     expect(insertTag(xmlString, mark, [0, 0, 0, 5])).to.equal('<mark><a>xxx</a>yy</mark>y');
    //     expect(insertTag(xmlString, mark, [0, 0, 0, 6])).to.equal('<mark><a>xxx</a>yyy</mark>');
    //     expect(insertTag(xmlString, mark, [0, 1, 0, 4])).to.equal(
    //         '<a>x</a><mark><a>xx</a>y</mark>yy'
    //     );
    //     expect(insertTag(xmlString, mark, [0, 2, 0, 5])).to.equal(
    //         '<a>xx</a><mark><a>x</a>yy</mark>y'
    //     );
    //     expect(insertTag(xmlString, mark, [0, 3, 0, 6])).to.equal('<a>xxx</a><mark>yyy</mark>');
    // });
    // it('<a style="color: red;">xxx</a>yyy', () => {
    //     let xmlString = '<a style="color: red;">xxx</a>yyy';
    //     expect(insertTag(xmlString, mark, [0, 0, 0, 4])).to.equal(
    //         '<mark><a style="color: red;">xxx</a>y</mark>yy'
    //     );
    //     expect(insertTag(xmlString, mark, [0, 1, 0, 5])).to.equal(
    //         '<a style="color: red;">x</a><mark><a style="color: red;">xx</a>yy</mark>y'
    //     );
    // });
    // it('xxx<a>yyy</a>', () => {
    //     let xmlString = 'xxx<a>yyy</a>';
    //     expect(insertTag(xmlString, mark, [0, 0, 0, 3])).to.equal('<mark>xxx</mark><a>yyy</a>');
    //     expect(insertTag(xmlString, mark, [0, 0, 0, 4])).to.equal(
    //         '<mark>xxx<a>y</a></mark><a>yy</a>'
    //     );
    //     expect(insertTag(xmlString, mark, [0, 0, 0, 5])).to.equal(
    //         '<mark>xxx<a>yy</a></mark><a>y</a>'
    //     );
    //     expect(insertTag(xmlString, mark, [0, 0, 0, 6])).to.equal('<mark>xxx<a>yyy</a></mark>');
    //     expect(insertTag(xmlString, mark, [0, 1, 0, 4])).to.equal(
    //         'x<mark>xx<a>y</a></mark><a>yy</a>'
    //     );
    //     expect(insertTag(xmlString, mark, [0, 1, 0, 6])).to.equal('x<mark>xx<a>yyy</a></mark>');
    //     expect(insertTag(xmlString, mark, [0, 2, 0, 3])).to.equal('xx<mark>x</mark><a>yyy</a>');
    //     expect(insertTag(xmlString, mark, [0, 3, 0, 5])).to.equal('xxx<a><mark>yy</mark>y</a>');
    //     expect(insertTag(xmlString, mark, [0, 3, 0, 6])).to.equal('xxx<a><mark>yyy</mark></a>');
    // });
    // it('xxx<a style="color: red;">yyy</a>', () => {
    //     let xmlString = 'xxx<a style="color: red;">yyy</a>';
    //     expect(insertTag(xmlString, mark, [0, 0, 0, 4])).to.equal(
    //         '<mark>xxx<a style="color: red;">y</a></mark><a style="color: red;">yy</a>'
    //     );
    //     expect(insertTag(xmlString, mark, [0, 0, 0, 6])).to.equal(
    //         '<mark>xxx<a style="color: red;">yyy</a></mark>'
    //     );
    //     expect(insertTag(xmlString, mark, [0, 1, 0, 6])).to.equal(
    //         'x<mark>xx<a style="color: red;">yyy</a></mark>'
    //     );
    // });
    // it('xxx<a>yyy</a>zzz', () => {
    //     let xmlString = 'xxx<a>yyy</a>zzz';
    //     expect(insertTag(xmlString, mark, [0, 0, 0, 5])).to.equal(
    //         '<mark>xxx<a>yy</a></mark><a>y</a>zzz'
    //     );
    //     expect(insertTag(xmlString, mark, [0, 1, 0, 6])).to.equal('x<mark>xx<a>yyy</a></mark>zzz');
    //     expect(insertTag(xmlString, mark, [0, 2, 0, 7])).to.equal('xx<mark>x<a>yyy</a>z</mark>zz');
    //     expect(insertTag(xmlString, mark, [0, 4, 0, 8])).to.equal(
    //         'xxx<a>y</a><mark><a>yy</a>zz</mark>z'
    //     );
    //     expect(insertTag(xmlString, mark, [0, 6, 0, 8])).to.equal('xxx<a>yyy</a><mark>zz</mark>z');
    // });
    it('qqq<a>xxx<b>yyy</b>zzz<a>ppp', () => {
        let xmlString = 'qqq<a>xxx<b>yyy</b>zzz</a>ppp';
        expect(insertTag(xmlString, mark, [0, 1, 0, 6])).to.equal(
            'q<mark>qq<a>xxx</a></mark><a><b>yy</b></a><a><b>y</b>zzz</a>ppp'
        );
        // expect(insertTag(xmlString, mark, [0, 1, 0, 8])).to.equal(
        //     'q<mark>qq<a>xxx<b>yy</b></a></mark><a><b>y</b>zzz</a>ppp'
        // );
        // expect(insertTag(xmlString, mark, [0, 1, 0, 11])).to.equal(
        //     'q<mark>qq<a>xxx<b>yyy</b>zz</a></mark><a>z</a>ppp'
        // );
        // expect(insertTag(xmlString, mark, [0, 1, 0, 14])).to.equal(
        //     'q<mark>qq<a>xxx<b>yyy</b>zzz</a>pp</mark>p'
        // );
        // expect(insertTag(xmlString, mark, [0, 4, 0, 8])).to.equal(
        //     'qqq<a>x<mark>xx<b>yy</b></mark><b>y</b>zzz</a>ppp'
        // );
        // expect(insertTag(xmlString, mark, [0, 4, 0, 11])).to.equal(
        //     'qqq<a>x<mark>xx<b>yyy</b>zz</mark>z</a>ppp'
        // );
        // expect(insertTag(xmlString, mark, [0, 4, 0, 14])).to.equal(
        //     'qqq<a>x</a><mark><a>xx<b>yyy</b>zzz</a>pp</mark>p'
        // );
        // expect(insertTag(xmlString, mark, [0, 7, 0, 11])).to.equal(
        //     'qqq<a>xxx<b>y</b><mark><b>yy</b>zz</mark>z</a>ppp'
        // );
        // expect(insertTag(xmlString, mark, [0, 7, 0, 14])).to.equal(
        //     'qqq<a>xxx<b>y</b></a><mark><a><b>yy</b>zzz</a>pp</mark>p'
        // );
    });
});

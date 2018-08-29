/**
 * Ckeditor 1.1.1
 * git+https://github.com/PeakTai/vue-html5-editor.git
 * build at Wed Aug 29 2018 22:25:28 GMT+0800 (中国标准时间)
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.CkEditor = factory());
}(this, (function () { 'use strict';

    function __$styleInject(css, returnValue) {
      if (typeof document === 'undefined') {
        return returnValue;
      }
      css = css || '';
      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';
      head.appendChild(style);
      
      if (style.styleSheet){
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
      return returnValue;
    }

    function polyfill () {
        // https://tc39.github.io/ecma262/#sec-array.prototype.includes
        if (!Array.prototype.includes) {
            Object.defineProperty(Array.prototype, 'includes', {
                value: function value(searchElement, fromIndex) {
                    // 1. Let O be ? ToObject(this value).
                    if (this == null) {
                        throw new TypeError('"this" is null or not defined')
                    }

                    var o = Object(this);

                    // 2. Let len be ? ToLength(? Get(O, "length")).
                    var len = o.length >>> 0;

                    // 3. If len is 0, return false.
                    if (len === 0) {
                        return false
                    }

                    // 4. Let n be ? ToInteger(fromIndex).
                    //    (If fromIndex is undefined, this step produces the value 0.)
                    var n = fromIndex | 0;

                    // 5. If n ≥ 0, then
                    //  a. Let k be n.
                    // 6. Else n < 0,
                    //  a. Let k be len + n.
                    //  b. If k < 0, let k be 0.
                    var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

                    // 7. Repeat, while k < len
                    while (k < len) {
                        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                        // b. If SameValueZero(searchElement, elementK) is true, return true.
                        // c. Increase k by 1.
                        // NOTE: === provides the correct "SameValueZero" comparison needed here.
                        if (o[k] === searchElement) {
                            return true
                        }
                        k++;
                    }

                    // 8. Return false
                    return false
                }
            });
        }
        // text.contains()
        if (!Text.prototype.contains) {
            Text.prototype.contains = function contains(node) {
                return this === node
            };
        }
    }

    var template = "<div> <div> <label> <input type=\"radio\" value=\"foreColor\" v-model=\"command\">&nbsp; {{$parent.locale[\"字體顏色\"]}} </label> <label> <input type=\"radio\" value=\"backColor\" v-model=\"command\">&nbsp; {{$parent.locale[\"背景颜色\"]}} </label> </div> <div> <div v-for=\"color in colors\" :style=\"{'background-color':color}\" class=\"color-card\" @click=\"changeColor(color)\"> </div> <div style=\"clear: both\"></div> </div> </div> ";

    __$styleInject(".vue-html5-editor .color-card{margin:2px;width:30px;height:30px;float:left;cursor:pointer}",undefined);

    /**
     * Created by peak on 2017/2/10.
     */
    var dashboard = {
        template: template,
        data: function data(){
            return {
                // foreColor,backColor
                command: 'foreColor',
                colors: [
                    '#000000', '#000033', '#000066', '#000099', '#003300', '#003333', '#003366',
                    '#003399', '#006600', '#006633', '#009900', '#330000', '#330033', '#330066',
                    '#333300', '#333366', '#660000', '#660033', '#663300', '#666600', '#666633',
                    '#666666', '#666699', '#990000', '#990033', '#9900CC', '#996600', '#FFCC00',
                    '#FFCCCC', '#FFCC99', '#FFFF00', '#FF9900', '#CCFFCC', '#CCFFFF', '#CCFF99'
                ]
            }
        },
        methods: {
            changeColor: function changeColor(color){
                this.$parent.execCommand(this.command, color);
            }
        }
    };

    /**
     * fore color and back color
     * Created by peak on 16/8/18.
     */
    var color = {
        name: 'color',
        icon: 'fa fa-paint-brush',
        i18n: 'color',
        dashboard: dashboard
    };

    var template$1 = "<div class=\"dashboard-font\" style=\"line-height: 36px;\"> <div> <label>{{$parent.locale[\"heading\"]}}:</label> <button type=\"button\" @click=\"setHeading('h2')\">一级标题</button> <button type=\"button\" @click=\"setHeading('h3')\">二级标题</button> <button type=\"button\" @click=\"setHeading('p')\">段落</button> </div> </div> <!-- <button v-for=\"h in 6\" type=\"button\" @click=\"setHeading(h)\">H{{h}}</button> --> <!-- <div>\n            <label>\n                {{$parent.locale[\"font name\"]}}:\n            </label>\n            <button v-for=\"name in nameList\" type=\"button\" @click=\"setFontName(name)\">{{name}}</button>\n        </div>\n        <div>\n            <label>\n                {{$parent.locale[\"font size\"]}}:\n            </label>\n            <button v-for=\"size in fontSizeList\" type=\"button\" @click=\"setFontSize(size)\">{{size}}</button>\n        </div>\n        <div>\n            <label>\n                {{$parent.locale[\"line height\"]}}:\n            </label>\n            <button v-for=\"lh in lineHeightList\" type=\"button\" @click=\"setLineHeight(lh)\">\n                {{lh}}\n            </button>\n        </div> -->";

    /**
     * Created by peak on 2017/2/14.
     */
    var Command = {
        JUSTIFY_LEFT: 'justifyLeft',
        JUSTIFY_CENTER: 'justifyCenter',
        JUSTIFY_RIGHT: 'justifyRight',
        FORE_COLOR: 'foreColor',
        BACK_COLOR: 'backColor',
        REMOVE_FORMAT: 'removeFormat',
        FONT_NAME: 'fontName',
        FONT_SIZE: 'fontSize',
        FORMAT_BLOCK: 'formatBlock',
        LINE_HEIGHT: 'lineHeight',
        INSERT_HORIZONTAL_RULE: 'insertHorizontalRule',
        INSERT_IMAGE: 'insertImage',
        CREATE_LINK: 'createLink',
        INSERT_ORDERED_LIST: 'insertOrderedList',
        INSERT_UNORDERED_LIST: 'insertUnorderedList',
        INSERT_HTML: 'insertHTML',
        BOLD: 'bold',
        ITALIC: 'italic',
        UNDERLINE: 'underline',
        STRIKE_THROUGH: 'strikeThrough',
        SUBSCRIPT: 'subscript',
        SUPERSCRIPT: 'superscript',
        UNDO: 'undo',
        UNLINK: 'unlink'
    };

    /**
     * Created by peak on 2017/2/10.
     */
    var dashboard$1 = {
        template: template$1,
        data: function data(){
            return {
                nameList: [
                    'Microsoft YaHei',
                    'Helvetica Neue',
                    'Helvetica',
                    'Arial',
                    'sans-serif',
                    'Verdana',
                    'Georgia',
                    'Times New Roman',
                    'Trebuchet MS',
                    'Microsoft JhengHei',
                    'Courier New',
                    'Impact',
                    'Comic Sans MS',
                    'Consolas'
                ],
                lineHeightList: [
                    '1.0', '1.2', '1.5', '1.8', '2.0', '2.5', '3.0'
                ],
                fontSizeList: [
                    '12px', '14px', '16px', '18px', '20px', '22px', '24px'
                ]
            }
        },
        methods: {
            setFontName: function setFontName(name){
                this.$parent.execCommand('fontName', name);
            },
            setFontSize: function setFontSize(size){
                this.$parent.execCommand('fontSize', size);
            },
            setHeading: function setHeading(heading){
                this.$parent.execCommand('formatBlock', ("" + heading));
            },
            // setHeading(heading){
            //     this.$parent.execCommand('formatBlock', `h${heading}`)
            // },
            setLineHeight: function setLineHeight(lh){
                this.$parent.execCommand(Command.LINE_HEIGHT, lh);
            }
        },
        created: function created(){
            var config = this.$options.module.config;
            // font name
            if (!config) {
                return
            }
            if (Array.isArray(config.fontNames)) {
                this.nameList = config.fontNames;
            }
        }
    };

    /**
     * font name and font size
     * Created by peak on 16/8/18.
     */
    var font = {
        name: 'font',
        icon: 'fa fa-font',
        i18n: 'font',
        dashboard: dashboard$1
    };

    /**
     * toggle full screen mode
     * Created by peak on 16/8/18.
     */
    var fullScreen = {
        name: 'full-screen',
        icon: 'fa fa-arrows-alt',
        i18n: 'full screen',
        handler: function handler(editor) {
            editor.toggleFullScreen();
        }
    };

    var template$2 = "<form @submit.prevent=\"createLink\"> <input type=\"text\" :placeholder=\"$parent.locale['please enter a url']\" v-model=\"url\" maxlength=\"1024\"> <button type=\"submit\">{{$parent.locale[\"添加链接\"]}}</button> </form>";

    var dashboard$2 = {
        template: template$2,
        data: function data(){
            return {url: null}
        },
        methods: {
            createLink: function createLink(){
                if (!this.url) {
                    return
                }
                this.$parent.execCommand('createLink', this.url);
                this.url = null;
            }
        }
    };

    /**
     * create link
     * Created by peak on 16/8/18.
     */

    var link = {
        name: 'link',
        icon: 'fa fa-chain',
        i18n: 'link',
        dashboard: dashboard$2
    };

    var template$3 = "<div> <button type=\"button\" @click=\"$parent.execCommand('bold')\">{{$parent.locale[\"加粗\"]}}</button> <button type=\"button\" @click=\"$parent.execCommand('italic')\">{{$parent.locale[\"傾斜\"]}}</button> <button type=\"button\" @click=\"$parent.execCommand('underline')\">{{$parent.locale[\"下劃線\"]}}</button> <button type=\"button\" @click=\"$parent.execCommand('strikeThrough')\">{{$parent.locale[\"錯誤縣\"]}} </button> <!-- <button type=\"button\" @click=\"$parent.execCommand('subscript')\">{{$parent.locale[\"subscript\"]}}</button> --> <!-- <button type=\"button\" @click=\"$parent.execCommand('superscript')\">{{$parent.locale[\"superscript\"]}}</button> --> </div> ";

    var dashboard$3 = {
        template: template$3
    };

    /**
     * text,set the text bold or italic or underline or with strike through or subscript or superscript
     * Created by peak on 16/8/18.
     */

    var text = {
        name: 'text',
        icon: 'fa fa-pencil',
        i18n: 'text',
        dashboard: dashboard$3
    };

    // import align from './align/index'
    // import undo from './undo/index'
    // import unlink from './unlink/index'

    /**
     * build-in moduls
     * Created by peak on 2016/11/1.
     */
    var buildInModules = [
        text,
        color,
        font,
        link,
        fullScreen
    ];

    //4 align,
    //5 list,
    //7 unlink,
    //8 table,
    //9 image,
    // 10hr,
    //11 eraser,
    //12 undo,
    //14 info

    /**
     * Created by peak on 2017/2/15.
     */
    /**
     * add every elements of extArr to sourceArr.
     * @param sourceArr
     * @param extArr
     */
    var mergeArray = function (sourceArr, extArr) {
        // note: Array.prototype.push.apply(arr1,arr2) is unreliable
        extArr.forEach(function (el) {
            sourceArr.push(el);
        });
    };

    /**
     * find all the descendant text nodes of a element
     * @param ancestor
     */
    var getDescendantTextNodes = function (ancestor) {
        if (ancestor.nodeType === Node.TEXT_NODE) {
            return [ancestor]
        }
        var textNodes = [];
        if (!ancestor.hasChildNodes()) {
            return textNodes
        }
        var childNodes = ancestor.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            var node = childNodes[i];
            if (node.nodeType === Node.TEXT_NODE) {
                textNodes.push(node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                mergeArray(textNodes, getDescendantTextNodes(node));
            }
        }
        return textNodes
    };
    /**
     * find all the descendant text nodes of an ancestor element that before the specify end element,
     * the ancestor element must contains the end element.
     * @param ancestor
     * @param endEl
     */
    var getBeforeEndDescendantTextNodes = function (ancestor, endEl) {
        var textNodes = [];
        var endIndex = 0;
        for (var i = 0; i < ancestor.childNodes.length; i++) {
            if (ancestor.childNodes[i].contains(endEl)) {
                endIndex = i;
                break
            }
        }

        for (var i$1 = 0; i$1 <= endIndex; i$1++) {
            var node = ancestor.childNodes[i$1];
            if (node === endEl) {
                mergeArray(textNodes, getDescendantTextNodes(node));
            } else if (i$1 === endIndex) {
                if (node.nodeType === Node.TEXT_NODE) {
                    textNodes.push(node);
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    mergeArray(textNodes, getBeforeEndDescendantTextNodes(node, endEl));
                }
            } else if (node.nodeType === Node.TEXT_NODE) {
                textNodes.push(node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                mergeArray(textNodes, getDescendantTextNodes(node));
            }
        }
        return textNodes
    };
    /**
     * find all the descendant text nodes of an ancestor element that after the specify start element,
     * the ancestor element must contains the start element.
     * @param ancestor
     * @param startEl
     */
    var getAfterStartDescendantTextNodes = function (ancestor, startEl) {
        var textNodes = [];
        var startIndex = 0;
        for (var i = 0; i < ancestor.childNodes.length; i++) {
            if (ancestor.childNodes[i].contains(startEl)) {
                startIndex = i;
                break
            }
        }

        for (var i$1 = startIndex; i$1 < ancestor.childNodes.length; i$1++) {
            var node = ancestor.childNodes[i$1];
            if (node === startEl) {
                mergeArray(textNodes, getDescendantTextNodes(node));
            } else if (i$1 === startIndex) {
                if (node.nodeType === Node.TEXT_NODE) {
                    textNodes.push(node);
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    mergeArray(textNodes,
                        getAfterStartDescendantTextNodes(node, startEl));
                }
            } else if (node.nodeType === Node.TEXT_NODE) {
                textNodes.push(node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                mergeArray(textNodes,
                    getDescendantTextNodes(node));
            }
        }
        return textNodes
    };


    /**
     * get the closest parent block node of a text node.
     * @param node
     * @return {Node}
     */
    var getParentBlockNode = function (node) {
        var blockNodeNames = ['DIV', 'P', 'SECTION', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
            'OL', 'UL', 'LI', 'TR', 'TD', 'TH', 'TBODY', 'THEAD', 'TABLE', 'ARTICLE', 'HEADER', 'FOOTER'];
        var container = node;
        while (container) {
            if (blockNodeNames.includes(container.nodeName)) {
                break
            }
            container = container.parentNode;
        }
        return container
    };

    var isInlineElement = function (node) {
        var inlineNodeNames = ['A', 'ABBR', 'ACRONYM', 'B', 'CITE', 'CODE', 'EM', 'I',
            'FONT', 'IMG', 'S', 'SMALL', 'SPAN', 'STRIKE', 'STRONG', 'U', 'SUB', 'SUP'];
        return inlineNodeNames.includes(node.nodeName)
    };

    // for IE 11
    if (!Text.prototype.contains) {
        Text.prototype.contains = function contains(otherNode) {
            return this === otherNode
        };
    }


    /**
     * Created by peak on 2017/2/14.
     */
    var RangeHandler = function RangeHandler(range) {
        if (!range || !(range instanceof Range)) {
            throw new TypeError('cant\'t resolve range')
        }
        this.range = range;
    };


    /**
     * find all the text nodes in range
     */
    RangeHandler.prototype.getAllTextNodesInRange = function getAllTextNodesInRange () {
        var startContainer = this.range.startContainer;
        var endContainer = this.range.endContainer;
        var rootEl = this.range.commonAncestorContainer;
        var textNodes = [];

        if (startContainer === endContainer) {
            if (startContainer.nodeType === Node.TEXT_NODE) {
                return [startContainer]
            }
            var childNodes = startContainer.childNodes;
            for (var i = this.range.startOffset; i < this.range.endOffset; i++) {
                mergeArray(textNodes, getDescendantTextNodes(childNodes[i]));
            }
            return textNodes
        }

        var startIndex = 0;
        var endIndex = 0;
        for (var i$1 = 0; i$1 < rootEl.childNodes.length; i$1++) {
            var node = rootEl.childNodes[i$1];
            if (node.contains(startContainer)) {
                startIndex = i$1;
            }
            if (node.contains(endContainer)) {
                endIndex = i$1;
            }
        }

        for (var i$2 = startIndex; i$2 <= endIndex; i$2++) {
            var node$1 = rootEl.childNodes[i$2];
            if (i$2 === startIndex) {
                if (node$1.nodeType === Node.TEXT_NODE) {
                    textNodes.push(node$1);
                } else if (node$1.nodeType === Node.ELEMENT_NODE) {
                    mergeArray(textNodes, getAfterStartDescendantTextNodes(node$1, startContainer));
                }
            } else if (i$2 === endIndex) {
                if (node$1.nodeType === Node.TEXT_NODE) {
                    textNodes.push(node$1);
                } else if (node$1.nodeType === Node.ELEMENT_NODE) {
                    mergeArray(textNodes, getBeforeEndDescendantTextNodes(node$1, endContainer));
                }
            } else if (node$1.nodeType === Node.TEXT_NODE) {
                textNodes.push(node$1);
            } else if (node$1.nodeType === Node.ELEMENT_NODE) {
                mergeArray(textNodes, getDescendantTextNodes(node$1));
            }
        }
        return textNodes
    };

    /**
     * execute edit command
     * @param {String} command
     * @param arg
     */
    RangeHandler.prototype.execCommand = function execCommand (command, arg) {
            var this$1 = this;

        switch (command) {

            case Command.FONT_SIZE: {
                // 重新实现，改为直接修改样式
                var textNodes = this.getAllTextNodesInRange();
                if (!textNodes.length) {
                    break
                }
                if (textNodes.length === 1 && textNodes[0] === this.range.startContainer
                    && textNodes[0] === this.range.endContainer) {
                    var textNode = textNodes[0];
                    if (this.range.startOffset === 0
                        && this.range.endOffset === textNode.textContent.length) {
                        if (textNode.parentNode.childNodes.length === 1
                            && isInlineElement(textNode.parentNode)) {
                            textNode.parentNode.style.fontSize = arg;
                            break
                        }
                        var span = document.createElement('span');
                        span.style.fontSize = arg;
                        textNode.parentNode.insertBefore(span, textNode);
                        span.appendChild(textNode);
                        break
                    }
                    var span$1 = document.createElement('span');
                    span$1.innerText = textNode.textContent.substring(
                        this.range.startOffset, this.range.endOffset);
                    span$1.style.fontSize = arg;
                    var frontPart = document.createTextNode(
                        textNode.textContent.substring(0, this.range.startOffset));
                    textNode.parentNode.insertBefore(frontPart, textNode);
                    textNode.parentNode.insertBefore(span$1, textNode);
                    textNode.textContent = textNode.textContent.substring(this.range.endOffset);
                    this.range.setStart(span$1, 0);
                    this.range.setEnd(span$1, 1);
                    break
                }

                textNodes.forEach(function (textNode) {
                    if (textNode === this$1.range.startContainer) {
                        if (this$1.range.startOffset === 0) {
                            if (textNode.parentNode.childNodes.length === 1
                                && isInlineElement(textNode.parentNode)) {
                                textNode.parentNode.style.fontSize = arg;
                            } else {
                                var span$1 = document.createElement('span');
                                span$1.style.fontSize = arg;
                                textNode.parentNode.insertBefore(span$1, textNode);
                                span$1.appendChild(textNode);
                            }
                            return
                        }
                        var span$2 = document.createElement('span');
                        textNode.textContent = textNode.textContent.substring(
                            0, this$1.range.startOffset);
                        span$2.style.fontSize = arg;
                        textNode.parentNode.insertBefore(span$2, textNode);
                        this$1.range.setStart(textNode, 0);
                        return
                    }
                    if (textNode === this$1.range.endContainer) {
                        if (this$1.range.endOffset === textNode.textContent.length) {
                            if (textNode.parentNode.childNodes.length === 1
                                && isInlineElement(textNode.parentNode)) {
                                textNode.parentNode.style.fontSize = arg;
                            } else {
                                var span$3 = document.createElement('span');
                                span$3.style.fontSize = arg;
                                textNode.parentNode.insertBefore(span$3, textNode);
                                span$3.appendChild(textNode);
                            }
                            return
                        }
                        var span$4 = document.createElement('span');
                        textNode.textContent = textNode.textContent.substring(this$1.range.endOffset);
                        span$4.style.fontSize = arg;
                        textNode.parentNode.insertBefore(span$4, textNode);
                        span$4.appendChild(textNode);
                        this$1.range.setStart(textNode, textNode.textContent.length);
                        return
                    }
                    if (textNode.parentNode.childNodes.length === 1
                        && isInlineElement(textNode.parentNode)) {
                        textNode.parentNode.style.fontSize = arg;
                        return
                    }

                    var span = document.createElement('span');
                    span.style.fontSize = arg;
                    textNode.parentNode.insertBefore(span, textNode);
                    span.appendChild(textNode);
                });
                break
            }
            case Command.FORMAT_BLOCK: {
                if (document.execCommand(Command.FORMAT_BLOCK, false, arg)) {
                    break
                }
                // hack
                var element = document.createElement(arg);
                this.range.surroundContents(element);
                break
            }
            case Command.LINE_HEIGHT: {
                var textNodes$1 = this.getAllTextNodesInRange();
                textNodes$1.forEach(function (textNode) {
                    var parentBlock = getParentBlockNode(textNode);
                    if (parentBlock) {
                        parentBlock.style.lineHeight = arg;
                    }
                });
                break
            }
            case Command.INSERT_HTML: {
                if (document.execCommand(Command.INSERT_HTML, false, arg)) {
                    break
                }
                // hack
                var fragment = document.createDocumentFragment();
                var div = document.createElement('div');
                div.innerHTML = arg;
                if (div.hasChildNodes()) {
                    for (var i = 0; i < div.childNodes.length; i++) {
                        fragment.appendChild(div.childNodes[i].cloneNode(true));
                    }
                }
                this.range.deleteContents();
                this.range.insertNode(fragment);
                break
            }
            default: {
                document.execCommand(command, false, arg);
                break
            }
        }
    };

    __$styleInject(".vue-html5-editor{font-size:14px;line-height:1.5;background-color:#fff;color:#333;border:1px solid #ddd;text-align:left;border-radius:5px;overflow:hidden;box-sizing:border-box}.vue-html5-editor *{box-sizing:border-box}.vue-html5-editor.full-screen{position:fixed!important;top:0!important;left:0!important;bottom:0!important;right:0!important;border-radius:0}.vue-html5-editor>.toolbar{position:relative;background-color:inherit}.vue-html5-editor>.toolbar>ul{list-style:none;padding:0;margin:0;border-bottom:1px solid #ddd}.vue-html5-editor>.toolbar>ul>li{display:inline-block;cursor:pointer;text-align:center;line-height:36px;padding:0 10px}.vue-html5-editor>.toolbar>ul>li .icon{height:16px;width:16px;display:inline-block;vertical-align:middle}.vue-html5-editor>.toolbar>.dashboard{background-color:inherit;border-bottom:1px solid #ddd;padding:10px;position:absolute;top:100%;left:0;right:0;overflow:auto}.vue-html5-editor>.toolbar>.dashboard input[type=number],.vue-html5-editor>.toolbar>.dashboard select{padding:6px 12px;color:inherit;background-color:transparent;border:1px solid #ddd;border-radius:5px}.vue-html5-editor>.toolbar>.dashboard input[type=number]:hover,.vue-html5-editor>.toolbar>.dashboard input[type=text]:hover,.vue-html5-editor>.toolbar>.dashboard select:hover{border-color:#bebebe}.vue-html5-editor>.toolbar>.dashboard input[type=number][disabled],.vue-html5-editor>.toolbar>.dashboard input[type=number][readonly],.vue-html5-editor>.toolbar>.dashboard input[type=text][disabled],.vue-html5-editor>.toolbar>.dashboard input[type=text][readonly],.vue-html5-editor>.toolbar>.dashboard select[disabled],.vue-html5-editor>.toolbar>.dashboard select[readonly]{background-color:#eee;opacity:1}.vue-html5-editor>.toolbar>.dashboard input[type=number][disabled],.vue-html5-editor>.toolbar>.dashboard input[type=text][disabled],.vue-html5-editor>.toolbar>.dashboard select[disabled]{cursor:not-allowed}.vue-html5-editor>.toolbar>.dashboard button{color:inherit;background-color:inherit;padding:6px 12px;white-space:nowrap;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid #ddd;border-radius:5px;margin-right:4px;margin-bottom:4px}.vue-html5-editor>.toolbar>.dashboard button:hover{border-color:#bebebe}.vue-html5-editor>.toolbar>.dashboard button[disabled]{cursor:not-allowed;opacity:.68}.vue-html5-editor>.toolbar>.dashboard button:last-child{margin-right:0}.vue-html5-editor>.toolbar>.dashboard label{font-weight:bolder}.vue-html5-editor>.content{overflow:auto;padding:10px}.vue-html5-editor>.content:focus{outline:0}@media (max-width:767px){.vue-html5-editor{margin-bottom:5px;width:100%!important}button:last-child,input[type=number]:last-child,input[type=text]:last-child,label:last-child,select:last-child{margin-bottom:0}}button:last-child,input:last-child,label:last-child,select:last-child{margin-right:0}",undefined);

    var template$4 = "<div class=\"vue-html5-editor\" :class=\"{'full-screen':fullScreen}\" :style=\"{'z-index':zIndex}\"> <div class=\"toolbar\" :style=\"{'z-index':zIndex+1}\" ref=\"toolbar\"> <ul> <template v-for=\"module in modules\"> <li :title=\"locale[module.i18n]\" @click=\"activeModule(module)\"> <span class=\"icon\" :class=\"module.icon\"></span> <template v-if=\"showModuleName === undefined ? defaultShowModuleName : showModuleName\"> &nbsp;{{locale[module.i18n]}} </template> </li> </template> </ul> <div class=\"dashboard\" v-show=\"dashboard\" ref=\"dashboard\"> <keep-alive> <div v-show=\"dashboard\" :is=\"dashboard\"></div> </keep-alive> </div> </div> <div class=\"content\" ref=\"content\" :style=\"contentStyle\" contenteditable @click=\"toggleDashboard(dashboard)\"> </div> </div>";

    /**
     * Created by peak on 2017/2/9.
     */
    var editor = {
        template: template$4,
        props: {
            content: {
                type: String,
                required: true,
                default: ''
            },
            height: {
                type: Number,
                default: 300,
                validator: function validator(val){
                    return val >= 100
                }
            },
            zIndex: {
                type: Number,
                default: 1000
            },
            autoHeight: {
                type: Boolean,
                default: true
            },
            showModuleName: {}
        },
        data: function data(){
            return {
                // defaultShowModuleName:false
                // locale: {},
                // modules:{},
                fullScreen: false,
                dashboard: null
            }
        },
        watch: {
            content: function content(val) {
                var content = this.$refs.content.innerHTML;
                if (val !== content) {
                    this.$refs.content.innerHTML = val;
                }
            },
            fullScreen: function fullScreen(val){
                var component = this;
                if (val) {
                    component.parentEl = component.$el.parentNode;
                    component.nextEl = component.$el.nextSibling;
                    document.body.appendChild(component.$el);
                    return
                }
                if (component.nextEl) {
                    component.parentEl.insertBefore(component.$el, component.nextEl);
                    return
                }
                component.parentEl.appendChild(component.$el);
            }
        },
        computed: {
            contentStyle: function contentStyle(){
                var style = {};
                if (this.fullScreen) {
                    style.height = (window.innerHeight - this.$refs.toolbar.clientHeight - 1) + "px";
                    return style
                }
                if (!this.autoHeight) {
                    style.height = (this.height) + "px";
                    return style
                }
                style['min-height'] = (this.height) + "px";
                return style
            }
        },
        methods: {
            toggleFullScreen: function toggleFullScreen(){
                this.fullScreen = !this.fullScreen;
            },
            enableFullScreen: function enableFullScreen(){
                this.fullScreen = true;
            },
            exitFullScreen: function exitFullScreen(){
                this.fullScreen = false;
            },
            focus: function focus(){
                this.$refs.content.focus();
            },
            toggleDashboard: function toggleDashboard(dashboard){
                this.dashboard = this.dashboard === dashboard ? null : dashboard;
            },
            execCommand: function execCommand(command, arg){
                this.restoreSelection();
                if (this.range) {
                    new RangeHandler(this.range).execCommand(command, arg);
                }
                this.toggleDashboard();
                this.$emit('change', this.$refs.content.innerHTML);
            },
            getCurrentRange: function getCurrentRange(){
                return this.range
            },
            saveCurrentRange: function saveCurrentRange(){
                var this$1 = this;

                var selection = window.getSelection ? window.getSelection() : document.getSelection();
                if (!selection.rangeCount) {
                    return
                }
                var content = this.$refs.content;
                for (var i = 0; i < selection.rangeCount; i++) {
                    var range = selection.getRangeAt(0);
                    var start = range.startContainer;
                    var end = range.endContainer;
                    // for IE11 : node.contains(textNode) always return false
                    start = start.nodeType === Node.TEXT_NODE ? start.parentNode : start;
                    end = end.nodeType === Node.TEXT_NODE ? end.parentNode : end;
                    if (content.contains(start) && content.contains(end)) {
                        this$1.range = range;
                        break
                    }
                }
            },
            restoreSelection: function restoreSelection(){
                var selection = window.getSelection ? window.getSelection() : document.getSelection();
                selection.removeAllRanges();
                if (this.range) {
                    selection.addRange(this.range);
                } else {
                    var content = this.$refs.content;
                    var div = document.createElement('div');
                    var range = document.createRange();
                    content.appendChild(div);
                    range.setStart(div, 0);
                    range.setEnd(div, 0);
                    selection.addRange(range);
                    this.range = range;
                }
            },
            activeModule: function activeModule(module){
                if (typeof module.handler === 'function') {
                    module.handler(this);
                    return
                }
                if (module.hasDashboard) {
                    this.toggleDashboard(("dashboard-" + (module.name)));
                }
            }
        },
        created: function created(){
            var this$1 = this;

            this.modules.forEach(function (module) {
                if (typeof module.init === 'function') {
                    module.init(this$1);
                }
            });
        },
        mounted: function mounted(){
            var this$1 = this;

            var content = this.$refs.content;
            content.innerHTML = this.content;
            content.addEventListener('mouseup', this.saveCurrentRange, false);
            content.addEventListener('keyup', function () {
                this$1.$emit('change', content.innerHTML);
                this$1.saveCurrentRange();
            }, false);
            content.addEventListener('mouseout', function (e) {
                if (e.target === content) {
                    this$1.saveCurrentRange();
                }
            }, false);
            this.touchHandler = function (e) {
                if (content.contains(e.target)) {
                    this$1.saveCurrentRange();
                }
            };

            window.addEventListener('touchend', this.touchHandler, false);
        },
        updated: function updated(){
            // update dashboard style
            if (this.$refs.dashboard){
                this.$refs.dashboard.style.maxHeight = (this.$refs.content.clientHeight) + "px";
            }
        },
        beforeDestroy: function beforeDestroy(){
            var this$1 = this;

            window.removeEventListener('touchend', this.touchHandler);
            this.modules.forEach(function (module) {
                if (typeof module.destroyed === 'function') {
                    module.destroyed(this$1);
                }
            });
        }
    };

    var i18nZhCn = {
        align: '对齐方式',
        image: '图片',
        list: '列表',
        link: '链接',
        unlink: '去除链接',
        table: '表格',
        font: '文字',
        'full screen': '全屏',
        text: '排版',
        eraser: '格式清除',
        info: '关于',
        color: '颜色',
        'please enter a url': '请输入地址',
        'create link': '创建链接',
        bold: '加粗',
        italic: '倾斜',
        underline: '下划线',
        'strike through': '删除线',
        subscript: '上标',
        superscript: '下标',
        heading: '标题',
        'font name': '字体',
        'font size': '文字大小',
        'left justify': '左对齐',
        'center justify': '居中',
        'right justify': '右对齐',
        'ordered list': '有序列表',
        'unordered list': '无序列表',
        'fore color': '前景色',
        'background color': '背景色',
        'row count': '行数',
        'column count': '列数',
        save: '确定',
        upload: '上传',
        progress: '进度',
        unknown: '未知',
        'please wait': '请稍等',
        error: '错误',
        abort: '中断',
        reset: '重置',
        hr: '分隔线',
        undo: '撤消',
        'line height': '行高',
        'exceed size limit': '超出大小限制'
    };

    var i18nEnUs = {
        align: 'align',
        image: 'image',
        list: 'list',
        link: 'link',
        unlink: 'unlink',
        table: 'table',
        font: 'font',
        'full screen': 'full screen',
        text: 'text',
        eraser: 'remove format',
        info: 'info',
        color: 'color',
        'please enter a url': 'please enter a url',
        'create link': 'create link',
        bold: 'bold',
        italic: 'italic',
        underline: 'underline',
        'strike through': 'strike through',
        subscript: 'subscript',
        superscript: 'superscript',
        heading: 'heading',
        'font name': 'font name',
        'font size': 'font size',
        'left justify': 'left justify',
        'center justify': 'center justify',
        'right justify': 'right justify',
        'ordered list': 'ordered list',
        'unordered list': 'unordered list',
        'fore color': 'fore color',
        'background color': 'background color',
        'row count': 'row count',
        'column count': 'column count',
        save: 'save',
        upload: 'upload',
        progress: 'progress',
        unknown: 'unknown',
        'please wait': 'please wait',
        error: 'error',
        abort: 'abort',
        reset: 'reset',
        hr: 'horizontal rule',
        undo: 'undo',
        'line height': 'line height',
        'exceed size limit': 'exceed size limit'
    };

    /**
     * Created by peak on 2017/2/24.
     */
    /**
     * shadow clone
     *
     * @param source    source object
     * @param ext       extended object
     */
    function mixin(source, ext) {
        if ( source === void 0 ) source = {};
        if ( ext === void 0 ) ext = {};

        Object.keys(ext).forEach(function (k) {
            // for data function
            if (k === 'data') {
                var dataSrc = source[k];
                var dataDesc = ext[k];
                if (typeof dataDesc === 'function') {
                    if (typeof dataSrc !== 'function') {
                        source[k] = dataDesc;
                    } else {
                        source[k] = function () { return mixin(dataSrc(), dataDesc()); };
                    }
                }
            } else {
                source[k] = ext[k];
            }
        });
        return source
    }

    polyfill();
    /**
     * Vue html5 Editor
     * @param Vue   {Vue}
     * @param options {Object}
     */
    var CkEditor = function CkEditor(options) {
        if ( options === void 0 ) options = {};

        var modules = [].concat( buildInModules );
        var components = {};

        // extended modules
        if (Array.isArray(options.modules)) {
            options.modules.forEach(function (module) {
                if (module.name) {
                    modules.push(module);
                }
            });
        }
        // hidden modules
        if (Array.isArray(options.hiddenModules)) {
            modules = (function () {
                var arr = [];
                modules.forEach(function (m) {
                    if (!options.hiddenModules.includes(m.name)) {
                        arr.push(m);
                    }
                });
                return arr
            })();
        }
        // visible modules
        if (Array.isArray(options.visibleModules)) {
            modules = (function () {
                var arr = [];
                options.visibleModules.forEach(function (name) {
                    modules.forEach(function (module) {
                        if (module.name === name) {
                            arr.push(module);
                        }
                    });
                });
                return arr
            })();
        }


        modules.forEach(function (module) {
            // specify the config for each module in options by name
            var config = options[module.name];
            module.config = mixin(module.config, config);

            if (module.dashboard) {
                // $options.module
                module.dashboard.module = module;
                components[("dashboard-" + (module.name))] = module.dashboard;
            }
            if (options.icons && options.icons[module.name]) {
                module.icon = options.icons[module.name];
            }

            module.hasDashboard = !!module.dashboard;
            // prevent vue sync
            module.dashboard = null;
        });

        // i18n
        var i18n = {'zh-cn': i18nZhCn, 'en-us': i18nEnUs};
        var customI18n = options.i18n || {};
        Object.keys(customI18n).forEach(function (key) {
            i18n[key] = i18n[key] ? mixin(i18n[key], customI18n[key]) : customI18n[key];
        });
        var language = options.language || 'en-us';
        var locale = i18n[language];

        // showModuleName
        var defaultShowModuleName = !!options.showModuleName;

        // ######################################
        var compo = mixin(editor, {
            data: function data() {
                return {modules: modules, locale: locale, defaultShowModuleName: defaultShowModuleName}
            },
            components: components
        });
        mixin(this, compo);
    };

    /**
     * global install
     *
     * @param Vue
     * @param options
     */
    CkEditor.install = function install (Vue, options) {
            if ( options === void 0 ) options = {};

        Vue.component(options.name || 'ck-editor', new CkEditor(options));
    };

    return CkEditor;

})));

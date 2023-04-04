// JavaScript Document
var _ = {
    doc: document,
    el: function(id) {
        return this.doc.getElementById(id);
    },
    createEl: function(name, obj) {
        var el = this.doc.createElement(name);
        _.each(obj, function(value, key) {
            switch (key) {
            case 'html':
            case 'text':
                el.innerHTML = value;
                break;
            case 'style':
                _.each(value, function(value, key) {
                    el.style[key] = value;
                });
                break;
            default:
                el.setAttribute(key, value);
            }
        });
        return el;
    },
    each: function(arr, fn, max) {
        max = max || Number.MAX_VALUE;
        var i, item;
        if (_.isArray(arr, false)) {
            for (i = 0; item = arr[i]; i++) {
                if (i >= max || fn(item, i) === false) {
                    break;
                }
            }
        } else {
            for (i in arr) {
                max--;
                if (max < 0 || fn(arr[i], i) === false) {
                    break;
                }
            }
        }

    },
    isArray: function(value, strict) {
        var type = Object.prototype.toString.apply(value)
          , isObj = value.length === undefined || _.isFunction(value);
        if (strict !== false) {
            return type === '[object Array]';
        } else {
            return !isObj;
        }
    },
    isFunction: function(value) {
        return typeof value === 'function' || typeof value === 'Function';
    },
    tmpl: function(template, obj) {
        var result = template;
        _.each(obj, function(item, i) {
            result = result.replace(new RegExp('{' + i + '}','g'), item);
        });
        return result;
    },
    mixIn: function(className, obj) {
        var args = arguments, proto = className.prototype, i, o;
        for (i = 1; o = args[i]; i++) {
            _.each(o, function(value, key) {
                proto[key] = value;
            });
        }
    },
    bind: function(element, event, fn, scope) {
        var f = function() {
            fn.apply(scope || this, arguments);
        }
        if (element.addEventListener) {
            element.addEventListener(event, f, false);
            //为了兼容，全用冒泡模型，一般也用不着捕获模型
        } else if (element.attachEvent) {
            element.attachEvent('on' + event, f);
        }
    },
    trim: function(str) {
        str = str.replace(/^\s+/, '');
        var end = str.length - 1
          , regx = /\s/;
        while (regx.test(str.charAt(end))) {
            end--;
        }
        return str.slice(0, end + 1);
    }
}

var Referance = function() {
    this.initHooks();
    this.initTypes();
    this.showTypeOptions();
    this.showInputs(this.defaultType)
    this.bindEvents();
}
Referance.config = {
    itemRegx: /{(\[.*?\])?(.+?)(\[.*?\])?}/g,
    defaultType: 'J',
    types: {
        J: {
            name: '期刊',
            required: '作者,题目,期刊名,出版年份,期数',
            format: '{作者}. {题目}[J]. {期刊名}, {出版年份}{[, ]卷号}{[(]期数[)]}{[:]起止页码}.'
        },
        N: {
            name: '报纸',
            required: '作者,题目,报纸名,出版日期,版次',
            format: '{作者}. {题目}[N]. {报纸名}, {出版日期}{[(]版次[)]}.'
        },
        M: {
            name: '图书',
            required: '作者,题目,版次,出版单位,出版年份',
            format: '{作者}. {题目}[M]. {版次[. ]}{出版地[:]}{出版单位}{[, ]出版年份}{[ :]起止页码}.'
        },
        C: {
            name: '会议录,论文集',
            required: '作者,题目,论文集名,出版单位,出版年份',
            format: '{作者}. {题目}[C]. //{主编[.]}{论文集名}, {出版地[: ]}{出版单位[, ]}{出版年份}{[:]起止页码}.'
        },
        D: {
            name: '学位论文',
            required: '作者,题目,保存单位,年份',
            format: '{作者}. {题目}[D]. {保存地[:]}{保存单位}{[, ]年份}.'
        },
        R: {
            name: '报告',
            required: '作者,题目,报告地,主办单位,报告年份',
            format: '{作者}. {题目}[R]. {报告地[:]}{主办单位}{[, ]报告年份}.'
        },
        'EB/OL': {
            name: '网络文献',
            required: '责任者,题目,引用日期,访问路径',
            format: '{责任者}. {题目}[EB/OL]. {出版年}[{引用日期}]. {访问路径}.'
        }
    },
    descriptions: {
        '作者': '多位作者请用英文逗号“,”分开',
        '引用日期': '格式为 年-月-日',
        '起止页码': '格式为 xxx-yyy'
    }
}
Referance.fn = {
    initTypes: function() {
        var that = this;
        _.each(this.types, function(type) {
            var format = type['format']
              , regx = that.itemRegx
              , regxArr = format.match(regx);
            type.required = type.required.split(',');
            type.regxArr = {};
            type.items = [];
            _.each(regxArr, function(item, i) {
                regx.lastIndex = 0;
                var result = regx.exec(item);
                if (result[1]) {
                    result[1] = result[1].substr(1, result[1].length - 2);
                }
                if (result[3]) {
                    result[3] = result[3].substr(1, result[3].length - 2);
                }
                type.regxArr[result[0]] = result;
                type.items[i] = result[2];
            });
        });
    },
    isRequired: function(itemName, typeName) {
        var type = this.types[typeName];
        if (!type) {
            return false;
        }
        var required = type.required, result = false, i, item;
        for (i = 0; item = required[i]; i++) {
            if (item == itemName) {
                result = true;
                break;
            }
        }
        return result;
    },
    getItems: function(typeName) {
        var type = this.types[typeName];
        return type && type.items;
    },
    formatReferance: function(typeName, obj) {
        var that = this
          , type = this.types[typeName];
        if (!type) {
            return false;
        }
        var regx = this.itemRegx;
        var result = type.format.replace(regx, function(match) {
            var regxArr = type.regxArr[match]
              , name = regxArr[2]
              , result = '';
            if (obj[name]) {
                regxArr[1] && (result += regxArr[1]);
                if (name == '作者') {
                    obj[name] = that.formatAuthors(obj[name]);
                }
                result += obj[name];
                regxArr[3] && (result += regxArr[3]);
            }
            return result;
        });
        return result;
    },
    formatAuthors: function(authors) {
        var authorArr = authors.split(/,|，/), isEn = false, enRegx = /^[a-zA-Z \.-]+$/, formated = /^[a-zA-Z]{2,}( [A-Z])*$/, temp, lastName, i, len, result = [];
        _.each(authorArr, function(author) {
            author = _.trim(author);
            if ((isEn = enRegx.test(author))) {
                author = author.replace(/\.|-/g, '');
                if (!formated.test(author)) {
                    temp = author.split(' ');
                    len = temp.length;
                    lastName = temp[--len];
                    author = lastName.charAt(0).toUpperCase() + lastName.substr(1);
                    for (i = 0; i < len; i++) {
                        if (temp[i]) {
                            author += ' ';
                            author += temp[i].charAt(0).toUpperCase();
                        }
                    }
                }
            }
            result.push(author);
        }, 3);
        if (authorArr.length > 3) {
            result.push(isEn ? 'etal' : '等')
        }
        return result.join(', ')
    }
}
Referance.ctrl = {
    typeSelector: '',
    inputForm: '',
    resultDiv: '',
    addBtn: '',
    selectType: '',
    initHooks: function() {
        this.typeSelector = _.el('typeSelector');
        this.inputForm = _.el('inputForm');
        this.resultDiv = _.el('resultDiv');
        this.addBtn = _.el('addBtn');
    },
    showInputs: function(typeName) {
        this.selectType = typeName;
        var template = '<p><label>{inputName}<span class="required">{required}</span></label><input type="text" name="{inputName}" value=""/>{desc}</p>';
        var that = this
          , items = this.getItems(typeName)
          , html = '';
        _.each(items, function(item, i) {
            var obj = {
                inputName: item,
                required: that.isRequired(item, typeName) ? '*' : '&nbsp;',
                desc: ''
            };
            if (that.descriptions[item]) {
                obj.desc = '<span class="desc">' + that.descriptions[item] + '</span>';
            }
            html += _.tmpl(template, obj);
        });
        this.inputForm.innerHTML = html;
    },
    showTypeOptions: function() {
        var that = this
          , types = this.types
          , selector = this.typeSelector
          , html = '';
        _.each(types, function(item, i) {
            var option = _.createEl('option', {
                text: item.name,
                value: i
            });
            if (that.defaultType == i) {
                option.selected = true;
                option.defaultselected = true;
            }
            selector.appendChild(option);
        });
    },
    cleanForm: function() {
        var formEls = this.inputForm.elements;
        _.each(formEls, function(el) {
            el.value = '';
        });
    },
    onSelectChange: function() {
        var type = this.typeSelector.value;
        this.showInputs(type);
    },
    addContent: function() {
        var formEls = this.inputForm.elements, formContent = {}, result, html;
        _.each(formEls, function(item) {
            if (item.name) {
                formContent[item.name] = item.value;
            }
        });
        result = this.formatReferance(this.selectType, formContent);
        html = '<div class="resultItem"><div class="referanceContent">' + result + '</div><a href="javascript:" class="delete">Delete</a><a href="javascript:" class="edit">Edit</a></div>';
        this.resultDiv.innerHTML += html;
        this.cleanForm();
    },
    listenResultDivEvents: function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement, resultDiv = this.resultDiv, attr;

        switch (target.className) {
        case 'delete':
            resultDiv.removeChild(target.parentNode);
            break;
        case 'edit':
            _.each(target.parentNode.childNodes, function(item) {
                if (item.className == 'referanceContent') {
                    item.setAttribute('contentEditable', true);
                    item.focus();
                    item.onblur = function() {
                        item.removeAttribute('contentEditable');
                    }
                }
            });
            break;
        }
    },
    bindEvents: function() {
        _.bind(this.typeSelector, 'change', this.onSelectChange, this);
        _.bind(this.addBtn, 'click', this.addContent, this);
        _.bind(this.resultDiv, 'click', this.listenResultDivEvents, this);
    }
}
_.mixIn(Referance, Referance.config, Referance.fn, Referance.ctrl);

new Referance();

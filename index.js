var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

var PersonsContent = function (_React$Component) {
    _inherits(PersonsContent, _React$Component);

    function PersonsContent(props) {
        _classCallCheck(this, PersonsContent);

        var _this = _possibleConstructorReturn(this, (PersonsContent.__proto__ || Object.getPrototypeOf(PersonsContent)).call(this, props));

        _this.state = {
            index: 0,
            pageNumber: 1
        };

        _this.handlePageChangeUp = _this.handlePageChangeUp.bind(_this);
        _this.handlePageChangeBack = _this.handlePageChangeBack.bind(_this);
        return _this;
    }

    _createClass(PersonsContent, [{
        key: 'handlePageChangeUp',
        value: function handlePageChangeUp(index, pageNumber) {
            this.setState({
                index: index,
                pageNumber: pageNumber
            });
        }
    }, {
        key: 'handlePageChangeBack',
        value: function handlePageChangeBack(index, pageNumber) {
            this.setState({
                index: index,
                pageNumber: pageNumber
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var filterText = this.props.filterText;

            var title = this.props.persons.map(function (element) {
                if (element.title.toUpperCase().indexOf(filterText) === -1) {
                    return;
                }
                return React.createElement(PersonContentShowOrHide, {
                    key: element.key,
                    title: element.title,
                    content: element.content,
                    photo: element.photo });
            });

            return React.createElement(ContentPage, {
                title: title,
                index: this.state.index,
                pageNumber: this.state.pageNumber,
                onPageChangeUp: this.handlePageChangeUp,
                onPageChangeBack: this.handlePageChangeBack });
        }
    }]);

    return PersonsContent;
}(React.Component);

var ContentPage = function (_React$Component2) {
    _inherits(ContentPage, _React$Component2);

    function ContentPage(props) {
        _classCallCheck(this, ContentPage);

        var _this2 = _possibleConstructorReturn(this, (ContentPage.__proto__ || Object.getPrototypeOf(ContentPage)).call(this, props));

        _this2.handlePageChangeUp = _this2.handlePageChangeUp.bind(_this2);
        _this2.handlePageChangeBack = _this2.handlePageChangeBack.bind(_this2);
        return _this2;
    }

    _createClass(ContentPage, [{
        key: 'handlePageChangeUp',
        value: function handlePageChangeUp(e) {
            var index = Number(e.target.value);
            var pageNumber = Number(e.target.name);

            this.props.onPageChangeUp(index + 3, pageNumber + 1);
        }
    }, {
        key: 'handlePageChangeBack',
        value: function handlePageChangeBack(e) {
            var index = Number(e.target.value);
            var pageNumber = Number(e.target.name);

            this.props.onPageChangeBack(index - 3, pageNumber - 1);
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.props.pageNumber === 1) {
                return React.createElement(
                    'div',
                    null,
                    this.props.title[0 + this.props.index],
                    this.props.title[1 + this.props.index],
                    this.props.title[2 + this.props.index],
                    React.createElement(
                        'button',
                        null,
                        this.props.pageNumber
                    ),
                    React.createElement(
                        'button',
                        {
                            value: this.props.index,
                            name: this.props.pageNumber,
                            onClick: this.handlePageChangeUp },
                        this.props.pageNumber + 1
                    )
                );
            } else {
                return React.createElement(
                    'div',
                    null,
                    this.props.title[0 + this.props.index],
                    this.props.title[1 + this.props.index],
                    this.props.title[2 + this.props.index],
                    React.createElement(
                        'button',
                        {
                            value: this.props.index,
                            name: this.props.pageNumber,
                            onClick: this.handlePageChangeBack },
                        this.props.pageNumber - 1
                    ),
                    React.createElement(
                        'button',
                        null,
                        this.props.pageNumber
                    ),
                    React.createElement(
                        'button',
                        {
                            value: this.props.index,
                            name: this.props.pageNumber,
                            onClick: this.handlePageChangeUp },
                        this.props.pageNumber + 1
                    )
                );
            }
        }
    }]);

    return ContentPage;
}(React.Component);

var PersonContentShowOrHide = function (_React$Component3) {
    _inherits(PersonContentShowOrHide, _React$Component3);

    function PersonContentShowOrHide(props) {
        _classCallCheck(this, PersonContentShowOrHide);

        var _this3 = _possibleConstructorReturn(this, (PersonContentShowOrHide.__proto__ || Object.getPrototypeOf(PersonContentShowOrHide)).call(this, props));

        _this3.state = {
            status: false
        };

        _this3.handleChangeStatus = _this3.handleChangeStatus.bind(_this3);
        return _this3;
    }

    _createClass(PersonContentShowOrHide, [{
        key: 'handleChangeStatus',
        value: function handleChangeStatus() {
            this.setState({
                status: this.state.status == false ? true : false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.status == false) {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'button',
                        { onClick: this.handleChangeStatus },
                        this.props.title
                    ),
                    React.createElement(
                        'p',
                        null,
                        this.props.content.slice(0, 15) + '...'
                    )
                );
            } else {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h1',
                        null,
                        this.props.title
                    ),
                    React.createElement(
                        'p',
                        null,
                        this.props.content
                    ),
                    React.createElement(ShowPhotoList, { photo: this.props.photo }),
                    React.createElement(
                        'button',
                        { onClick: this.handleChangeStatus },
                        '\u0417\u0430\u043A\u0440\u044B\u0442\u044C'
                    )
                );
            }
        }
    }]);

    return PersonContentShowOrHide;
}(React.Component);

var ShowPhotoList = function (_React$Component4) {
    _inherits(ShowPhotoList, _React$Component4);

    function ShowPhotoList() {
        _classCallCheck(this, ShowPhotoList);

        return _possibleConstructorReturn(this, (ShowPhotoList.__proto__ || Object.getPrototypeOf(ShowPhotoList)).apply(this, arguments));
    }

    _createClass(ShowPhotoList, [{
        key: 'render',
        value: function render() {
            var photoList = this.props.photo.map(function (element) {
                return element + ' ';
            });

            return React.createElement(
                'p',
                null,
                photoList
            );
        }
    }]);

    return ShowPhotoList;
}(React.Component);

var SearchBar = function (_React$Component5) {
    _inherits(SearchBar, _React$Component5);

    function SearchBar(props) {
        _classCallCheck(this, SearchBar);

        var _this5 = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

        _this5.state = {
            searchRequest: ''
        };

        _this5.handleSearchRequestChange = _this5.handleSearchRequestChange.bind(_this5);
        _this5.handleFilterTextChange = _this5.handleFilterTextChange.bind(_this5);
        return _this5;
    }

    _createClass(SearchBar, [{
        key: 'handleSearchRequestChange',
        value: function handleSearchRequestChange(e) {
            this.setState({
                searchRequest: e.target.value
            });
        }
    }, {
        key: 'handleFilterTextChange',
        value: function handleFilterTextChange(e) {
            this.props.onFilterTextChange(e.target.value);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    '\u041F\u043E\u0438\u0441\u043A'
                ),
                React.createElement('input', {
                    type: 'text',
                    name: 'search',
                    value: this.state.searchRequest,
                    onChange: this.handleSearchRequestChange,
                    placeholder: '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F...' }),
                React.createElement(
                    'button',
                    {
                        value: this.state.searchRequest.toUpperCase(),
                        onClick: this.handleFilterTextChange
                    },
                    '\u041D\u0430\u0447\u0430\u0442\u044C'
                )
            );
        }
    }]);

    return SearchBar;
}(React.Component);

var Main = function (_React$Component6) {
    _inherits(Main, _React$Component6);

    function Main(props) {
        _classCallCheck(this, Main);

        var _this6 = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

        _this6.state = {
            filterText: ''
        };
        _this6.handleFilterTextChange = _this6.handleFilterTextChange.bind(_this6);
        return _this6;
    }

    _createClass(Main, [{
        key: 'handleFilterTextChange',
        value: function handleFilterTextChange(filterText) {
            this.setState({
                filterText: filterText
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(SearchBar, {
                    filterText: this.state.filterText,
                    onFilterTextChange: this.handleFilterTextChange }),
                React.createElement(PersonsContent, {
                    filterText: this.state.filterText,
                    persons: this.props.persons })
            );
        }
    }]);

    return Main;
}(React.Component);

var PERSONS = [{ key: '1', title: 'Генадий Горин', content: 'Очень хороший человек, столкнувшийся с крайне недружелюбными ' + 'жизненными обстоятельствами. Однако же он с честью через них прошел.',
    photo: [1, 2, 3, 4, 5] }, { key: '2', title: 'Зубенко Михаил Петрович', content: 'Вор в законе Шумиловского городка по прозвищу: "Мафиозник" - крайне ' + 'опасная, но очень расчетливая личность. Обладает непревзойденным вкусом.',
    photo: [1, 2, 3] }, { key: '3', title: 'Джон Якудза', content: 'Странная личность: скрытная, лысая. Многие утверждают, что ее и вовсе не ' + 'существует, однако все данные из сети интернет - говорят об обратном.',
    photo: [1, 2, 3, 4, 5, 26, 100, 22, 41, 758, 91] }, { key: '4', title: 'Шамаич', content: 'Самый крутой гонщик на районе, тупо крут без лишних слов.' + 'На его счету не одна разбитая машина. Но он может себе такое позволить.',
    photo: [1, 2, 3, 4, 91] }, { key: '5', title: 'Лонк', content: 'Неизвестный брат близнец небезызвестного Лонка. Очень на него похож, ' + 'однако только внешне. Внутренне не отличается особым умом и сообразительностью.',
    photo: [1, 4, 3, 4, 5, 111, 828] }, { key: '6', title: 'Джон Кивами', content: 'Личность из серии легендарного Джона Якудзы. Возможно как-то с ним связан, ' + 'но данный факт еще предстоит установить, как сам факт их существования.',
    photo: [76, 22.22, 2.00, 5, 26, 100, 22, 41, 758, 91] }];

var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Main, { persons: PERSONS }));

/*ЧТО НУЖНО СДЕЛАТЬ:
  - ПОИСК: не привязанный к странице. Который будет идти по всему массиву
  - ПАГИНАЦИЯ: более наглядное отображение и в принципе в лучшей форме сделанное
*/
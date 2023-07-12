import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './components/Header/Header';

class PersonsContent extends React.Component {
    render() {
        const filterText = this.props.filterText;
        
        const title = this.props.persons.map((element) => {
            if (element.title.toUpperCase().indexOf(filterText) === -1) {
                return;
            }
            return <PersonContentShowOrHide 
                     key={element.key} 
                     title={element.title}
                     content={element.content}
                     photo={element.photo} />;
        });

        const filterTitle = title.filter(element => element !== undefined);
        
        return <ContentPage 
                 title={filterTitle} 
                 index={this.props.index}
                 pageNumber={this.props.pageNumber} 
                 onPageChangeUp={this.props.onPageChangeUp}
                 onPageChangeBack={this.props.onPageChangeBack} />;
    }
}
class ContentPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.handlePageChangeUp = this.handlePageChangeUp.bind(this);
        this.handlePageChangeBack = this.handlePageChangeBack.bind(this);
    }

    handlePageChangeUp(e) {
        let index = Number(e.target.value);
        let pageNumber = Number(e.target.name);

        this.props.onPageChangeUp(index + 3, pageNumber + 1);
    }
    
    handlePageChangeBack(e) {
        let index = Number(e.target.value);
        let pageNumber = Number(e.target.name);

        this.props.onPageChangeBack(index - 3, pageNumber - 1);
    }

    render() {
        console.log(this.props.title[0 + (this.props.index + 3)]);
        
        if (this.props.pageNumber === 1) {
            if((this.props.title[0 + (this.props.index + 3)]) == undefined) {
                return (
                    <div>
                        {this.props.title[0 + this.props.index]}
                        {this.props.title[1 + this.props.index]}
                        {this.props.title[2 + this.props.index]}
                        <div className='page-list'>
                            <button className='current-page'>{this.props.pageNumber}</button>
                        </div>
                        
                </div>
                );
            }
            return (
                <div>
                    {this.props.title[0 + this.props.index]}
                    {this.props.title[1 + this.props.index]}
                    {this.props.title[2 + this.props.index]}
                    <div className='page-list'>
                        <button className='current-page'>{this.props.pageNumber}</button>
                        <button
                          className="previous-next-page"
                          value={this.props.index}
                          name={this.props.pageNumber}
                          onClick={this.handlePageChangeUp} >
                            {this.props.pageNumber + 1}
                        </button>
                    </div>
                </div>
           );
        } else if ((this.props.title[0 + (this.props.index + 3)]) == undefined) {
            return (
                <div>                    
                    {this.props.title[0 + this.props.index]}
                    {this.props.title[1 + this.props.index]}
                    {this.props.title[2 + this.props.index]}
                    <div className='page-list'>
                        <button
                          className='previous-next-page'
                          value={this.props.index}
                          name={this.props.pageNumber}
                          onClick={this.handlePageChangeBack} >
                            {this.props.pageNumber - 1}
                        </button>
                        <button className='current-page'>{this.props.pageNumber}</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div>                    
                    {this.props.title[0 + this.props.index]}
                    {this.props.title[1 + this.props.index]}
                    {this.props.title[2 + this.props.index]}
                    <div className="page-list">
                        <button
                          className='previous-next-page'
                          value={this.props.index}
                          name={this.props.pageNumber}
                          onClick={this.handlePageChangeBack} >
                            {this.props.pageNumber - 1}
                        </button>
                        <button className='current-page'>{this.props.pageNumber}</button>
                        <button
                          className='previous-next-page'
                          value={this.props.index}
                          name={this.props.pageNumber}
                          onClick={this.handlePageChangeUp} >
                            {this.props.pageNumber + 1}
                        </button>
                    </div>
                </div>
            );                
        }
    }
}
class PersonContentShowOrHide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false
        };

        this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }

    handleChangeStatus() {
        this.setState({
            status: this.state.status == false ? true : false
        })
    }

    render() {
        console.log('В PersonsContentShowOrHide\n' + `${this.props.photo}`);
        if (this.state.status == false) {
            return (
                <div className='content-div font-settings'>
                    <button className="btn-name" onClick={this.handleChangeStatus}>
                        <h3>{this.props.title}</h3>
                    </button>
                    <p>{this.props.content.slice(0, 15) + '...'}</p>
                </div>
            )
        } else {
            return (
                <div className='content-div font-settings'>
                    <button className="btn-name" onClick={this.handleChangeStatus}>
                        <h3>{this.props.title}</h3>
                    </button>
                    <p>{this.props.content}</p>
                    <ShowPhotoList photo={this.props.photo}/>
                    <button className='btn-close' onClick={this.handleChangeStatus}>Закрыть</button>
                </div>
                
            )
        }
    }
}
class ShowPhotoList extends React.Component {
    render() {
        console.log('В ShowPhotoList\n' + `${this.props.photo}`);
        const photoList = this.props.photo.map((element) => {
            return element + ' ';
        });
        
        console.log('В ShowPhotoList прямо перед return\n' + `${this.props.photo[0]}`);
        
        if(Number.isInteger(this.props.photo[0]) == true) {
            return <h1>А ето циферка</h1>;
        }
        return <img src={require(`${this.props.photo[0]}`)} alt='Здесь должны быть наши фото' width={200}/>;
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchRequest: ''
        }
        
        this.handleSearchRequestChange = this.handleSearchRequestChange.bind(this);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }
    
    handleSearchRequestChange(e) {
        this.setState({
            searchRequest: e.target.value
        });
    }
    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }
    render() {
        return (
            <div className='search-div font-settings'>
                <h1>Зал памяти</h1>
                <div className='search-subDiv font-settings'>
                    <input 
                      type='text' 
                      name='search'
                      className='font-settings'
                      value={this.state.searchRequest} 
                      onChange={this.handleSearchRequestChange}
                      placeholder='Введите имя...'/>
                    <button 
                      className='font-settings'
                      value={this.state.searchRequest.toUpperCase()} 
                      onClick={this.handleFilterTextChange}
                    >Поиск</button>  
                </div>
            </div>
        );
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            pageNumber: 1,
            filterText: ''
        };

        this.handlePageChangeUp = this.handlePageChangeUp.bind(this);
        this.handlePageChangeBack = this.handlePageChangeBack.bind(this);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handlePageChangeUp(index, pageNumber) {
        this.setState({
            index: index,
            pageNumber: pageNumber
        })
    }    
    handlePageChangeBack(index, pageNumber) {
        this.setState({
            index: index,
            pageNumber: pageNumber
        })
    }
    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText,
            index: 0,
            pageNumber: 1
        });
    }

    render() {
        console.log('В main\n' + `${this.props.persons[0].photo}`);
        return (
            <div>
                <Header/>
                {/* <SearchBar
                  filterText={this.state.filterText}
                  onFilterTextChange={this.handleFilterTextChange} /> */}
                <PersonsContent 
                  index={this.state.index}
                  pageNumber={this.state.pageNumber}
                  onPageChangeUp={this.handlePageChangeUp}
                  onPageChangeBack={this.handlePageChangeBack}
                  filterText={this.state.filterText} 
                  persons={this.props.persons} />                
            </div>
        );
    }
}

const PERSONS = [
    {key: '1', title: 'Генадий Горин', content: 
      'Очень хороший человек, столкнувшийся с крайне недружелюбными ' +
      'жизненными обстоятельствами. Однако же он с честью через них прошел. ' +
      'Однако спустя многие годы борьбы, его психическое здоровье сущетсвенно ' +
      'повредилось. Сейчас наш герой жив, но находится в пограничном состоянии.',
      photo: ['./content/HM_Antropov_I_A/1_blank.jpg', './content/HM_Antropov_I_A/2_blank_op.jpg']},
    {key: '2', title: 'Зубенко Михаил Петрович', content: 
      'Вор в законе Шумиловского городка по прозвищу: "Мафиозник" - крайне ' +
      'опасная, но очень расчетливая личность. Обладает непревзойденным вкусом.',
      photo: [1]},
    {key: '3', title: 'Джон Якудза', content: 
      'Странная личность: скрытная, лысая. Многие утверждают, что ее и вовсе не ' +
      'существует, однако все данные из сети интернет - говорят об обратном.',
      photo: [1, 2, 3, 4, 5, 26, 100, 22, 41, 758, 91]},
    
    {key: '4', title: 'Шамаич', content: 
      'Самый крутой гонщик на районе, тупо крут без лишних слов.' +
      'На его счету не одна разбитая машина. Но он может себе такое позволить.',
      photo: [1, 2, 3, 4, 91]},
    {key: '5', title: 'Лонк', content: 
      'Неизвестный брат близнец небезызвестного Линка. Очень на него похож, ' +
      'однако только внешне. Внутренне не отличается особым умом и сообразительностью.',
      photo: [1, 4, 3, 4, 5, 111, 828]},
    {key: '6', title: 'Джон Кивами', content: 
      'Личность из серии легендарного Джона Якудзы. Возможно как-то с ним связан, ' +
      'но данный факт еще предстоит установить, как сам факт их существования.',
      photo: [76, 22.22, 2.00, 5, 26, 100, 22, 41, 758, 91]},
    {key: '7', title: 'Джон Силверхед', content: 
      'Заебался писать эти примеры ебаные ' +
      'поэтому сами какую-нибудь шутку себе придумайте',
      photo: [76, 22.22, 2.00, 5, 26, 100, 22, 41, 758, 91]},
    {key: '8', title: 'Джон Гетсби', content: 
      'Может продать вам ручку на собеседовании. ' +
      'Если вы ее не станете покупать, то ладно, он не расстроиться.',
      photo: [76, 22.22, 2.00, 5, 26, 100, 22, 41, 758, 91]},
    {key: '9', title: 'Джон Мазовски', content: 
      'Так-то он Майк, но вот сейчас нужно, чтоб был Джно. ' +
      'Чисто для чистоты эксперемента',
      photo: [76, 22.22, 2.00, 5, 26, 100, 22, 41, 758, 91]},
    {key: '10', title: 'Джон Афанасий', content:
      'Такого человека просто не существует, ' +
      'просто проходите мимо.',
      photo: [76, 22.22, 2.00, 5, 26, 100, 22, 41, 758, 91]},
    {key: '11', title: 'Спуди Мен', content: 
      'Подросток, вошедший во взрослую жизнь. ' +
      'Не то, чтобы полностью был к этому готов, однако делать что-то надо.',
      photo: [76, 22.22, 2.00, 5, 26, 100, 22, 41, 758, 91]},
    {key: '12', title: 'Михаил Шумахер', content: 
      'Гонщик не реальный ' +
      'профессиональный. Мда',
      photo: [76, 22.22, 2.00, 5, 26, 100, 22, 41, 758, 91]},
    {key: '13', title: 'Джон Браун', content: 
      'Знаменитый космонафт в честь которого даже назвали боевой СпейсБатлшим. ' +
      'До сих пор, правда, не очень понятно чем он знаменит.',
      photo: [76, 22.22, 2.00, 5, 26, 100, 22, 41, 758, 91]},
]

console.log('В начале пути\n' + `${PERSONS[0].photo}`)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main className="font-settings" persons={PERSONS}/>);

/*
    Осталось сделать лист страниц и протестировать на конкретном контенте    
*/
import React, { Component } from 'react';

class PostsList extends Component {

    constructor() {
        super();

        this.state = {
            postsList: [],
            filterdPostsList: [],
        }
    }


    componentDidMount()
    /* metoda reactowa z cyklu zycia kompnentu */ {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                this.setState({ postsList: json, filterdPostsList: json })
            });
    }

    changeValue = event => {
        /*   this.setState({ value: event.target.value }) */
        /*  console.log(event.target.value); */
        /* event.target zwraca obiekt naktorym zostało wywołane zdarzenie */
        /* litrujemy po tablicy z steta */
        let trimValue = event.target.value.trim();
        let filtereArray = this.state.postsList.filter(currentPost => {
            return currentPost.title.includes(trimValue);

        })

        /*  filtrujemy o tablicy ze 100 tytułami. gdy kasy=uejmy to changevalue wywołuje si eod nowa i znowu filtrujemy po całej tablicy bo utworzylismy sobie dwie tablice.jednak posiada wszytskie tytuly a natomiast wysiwrtlamy ta druga która posiada tylko tytłu pasuje do wartosci wpisanej w inputa */

        this.setState({ filterdPostsList: filtereArray })


    }

    render() {

        const posts = this.state.filterdPostsList.map(post => {
            return (
                <div className='post' key={post.id}>

                    <h3> {post.id}.{post.title}</h3>
                    <p> {post.body}</p>
                </div>
            )
        });
        console.log(posts);

        return (
            <div className="posts-list">
                <h2>Lista postów</h2>
                <input type="text" onChange={this.changeValue}
                    /* alternatywny sposob wyciagania wartosci np na submit -> ref-zwraca do funkjci referencje dotego elementu  ref={input.=> this.inputValue = input}
                   con(this.inputValue.value)        
           this.inputValue tworzy jakby nowe pole do którego przypisujemy wartosc z inputa*/
                    onChange={this.changeValue} />
                {posts}
            </div>
        );
    }
}

export default PostsList;
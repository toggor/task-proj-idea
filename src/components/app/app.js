import React, {Component} from "react";
import AppHeader from "../app-header"
import SearchPanel from "../search-panel"
import PostStatusFilter from "../post-status-filter"
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import './app.css';

export default class App extends Component{

    constructor(props) {
        super(props);

        this.state ={
            data : [
                {label: "Going to learn React", important:false, like:false, id: 1},
                {label: "Going to do some sport", important:false, like:true, id: 2},
                {label: "Going to play some Dwarfs", important:false, like:false, id: 3},
                {label: "Going to have a nap", important:true, like:false, id: 4}
            ],
            term: ''

        }
        this.deleteItem=this.deleteItem.bind(this);
        this.addItem=this.addItem.bind(this);
        this.onToggleImportant=this.onToggleImportant.bind(this);
        this.onToggleLike=this.onToggleLike.bind(this);
        this.onUpdateSearch=this.onUpdateSearch.bind(this);

        this.maxId = 5;
    }

    deleteItem(id){
        this.setState(({data}) => {
            // we should not change state directly
            // we create a substitute array and
            // oly AFTER that we swap the data with new one

            const index = data.findIndex(elem=>elem.id===id);

            const before = data.slice(0,index);
            const after = data.slice(index+1);
            const newArr = [...before,...after];

            return {
                data: newArr
            }
        })
        // console.log(`deleted ${id}`);
    }

    addItem(body){
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }
        this.setState(({data})=>{
            const newArr = [...data,newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleLike(id){
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, like: !old.like};

            const newArr = [...data.slice(0,index),newItem,...data.slice(index+1)];
            return{
                data: newArr
            }
        })
    }

    // TODO: modify onToggleLike & onToggleImportant to reuse duplicate code
    onToggleImportant(id){
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, important: !old.important};

            const newArr = [...data.slice(0,index),newItem,...data.slice(index+1)];
            return{
                data: newArr
            }
        })
    }


    onUpdateSearch(term){
        this.setState({term});
    }

    searchPost(items, term){
        console.log(`received term ${term}`);

        if(term.length === 0){
            return items
        };

        return items.filter((item)=>{

            console.log(item.label.indexOf(term) > -1);
            return item.label.indexOf(term) > -1;
        });

    }



    render() {
        const {data, term} = this.state;

        const liked = data.filter(item=>item.like).length;
        const  allPosts = data.length;

        const visiblePosts = this.searchPost(data,term);

        return(
            <div className="app">
                <AppHeader
                    liked = {liked}
                    allPosts = {allPosts}
                />
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter />
                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLike={this.onToggleLike}
                />
                <PostAddForm
                    onAdd={this.addItem}/>
            </div>
        )
    }
}

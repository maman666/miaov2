import React,{Component} from 'react';

import Home from './pages/Home';
import List from './pages/List';
import Goods from './pages/Goods';
import Cart from './pages/Cart';

// 全部加载
// import { Menu, Icon } from 'antd';
// import "antd/dist/antd.css";

// 按需加载antd
// import Menu from 'antd/lib/menu';
// import 'antd/lib/menu/style';
// import Icon from 'antd/lib/icon';
// import 'antd/lib/icon/style';


// babel-plugin-import
import { Menu, Icon } from 'antd';


import {Switch,Route,Redirect,NavLink,withRouter} from 'react-router-dom';

class App extends Component{
    constructor(){
        super();
        this.state={
            navs:[
                {
                    text:'首页',
                    name:'Home',
                    path:'/home',
                    icon:'home'
                },
                {
                    text:'列表',
                    name:'List',
                    path:'/list',
                    icon:'bars'
                },
                {
                    text:'详情',
                    name:'Goods',
                    path:'/goods',
                    icon:'shopping'
                },
                {
                    text:'购物车',
                    name:'Cart',
                    path:'/cart',
                    icon:'shopping-cart'
                }
            ],
            current:'home'
        }
    }
    handleClick=(e)=>{
        console.log(this,e)
        this.setState({
            // key拿到数据name属性
            current:e.key
        },()=>{
            //路由跳转：编程式导航
            // 利用withRouter()高阶组件实现history的传递
            this.props.history.push('/'+e.key.toLowerCase());

        })
    }
    render(){
        return (
           <div className="container">
                {/* this.state.navs.map(item=><NavLink to={item.path} activeStyle={{color:'red',fontWeight:'blod'}} key={item.name}>{item.text}</NavLink>) */}
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    {
                        this.state.navs.map(item => <Menu.Item key={item.name}><Icon type={item.icon} />{item.text}</Menu.Item>)
                    }
                    
                </Menu>
                {/* Switch用<Switch/>来包裹多个Route/Redirect组件，
                只渲染出第一个与浏览器访问地址匹配的 <Route> 或 <Redirect> */}
                <Switch>
                    <Route path="/home" component={Home}/>
                    <Route path="/list" component={List}/>
                    <Route path="/goods" component={Goods}/>
                    <Route path="/cart" component={Cart}/>
                    {/* <Route path="/" render={()=><div>我的首页</div>} exact/>  exact精确匹配*/}
                    <Redirect from="/" to="/home"/>
                </Switch>
           </div>
        )
    }
}

// 利用withRouter()高阶组件实现history的传递
App = withRouter(App);
export default App;

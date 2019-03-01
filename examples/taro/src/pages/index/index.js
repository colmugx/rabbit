import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { Inject } from '../../store'

import './index.css'


@Inject('counter')
class Index extends Component {

    config = {
    navigationBarTitleText: '首页'
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  add = () => this.props.increment()

  dec = () => this.props.decrement()

  asyncAdd = () => this.props.asyncIncrement()

  render () {
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.add}>+</Button>
        <Button className='dec_btn' onClick={this.dec}>-</Button>
        <Button className='dec_btn' onClick={this.asyncAdd}>async</Button>
        <View><Text>{this.props.count}</Text></View>
        <View><Text>Hello, World</Text></View>
      </View>
    )
  }
}

export default Index

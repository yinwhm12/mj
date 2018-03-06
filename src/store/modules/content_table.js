/**
 * Created by yin on 2017/7/6.
 */
import {
  SET_TABLE_CONTENT,
}from '../mutation_types'

const state ={
// 内容 菜单 记录
  room_card_menu:[//房卡
    // '账户信息','修改密码','充卡记录','总代理充值'
    '账户信息','修改密码'
  ],
  proxy_menu:[//代理
    '所有代理','添加代理'
  ],
  player_menu:[//玩家
    // '所有玩家','黑名单'
    '上周前10','划转'
  ],
  system_information_menu:[
    '游戏公告','游戏广播'
  ],
  version_information_menu:[
    '历史版本','更新版本'
  ],

//  房卡具体内容 菜单栏
  room_all_account:[
    '剩余房卡','已售出房卡','充卡次数'
  ],
  room_sell_cards:[
    '售卡时间','玩家ID','昵称','代理级别', '售出数量','状态'
  ],
  room_recharge_cards:[
    '充卡时间','充卡数量','剩余数量','状态'
  ],
  room_all_proxy:[
    '加入时间','代理级别','玩家ID','昵称','持卡数量','历史交易','操作'
  ],

//  代理菜单
  proxy_all: [
    '加入时间','代理级别','玩家ID','昵称','现持卡数','历史交易/张','操作'
  ],
  proxy_add: [//添加代理

  ],
//  玩家 菜单
  player_information: [
    '头像','游戏ID','昵称','上周贡献','本周战绩','代理人数'
  ],
//  系统消息
  game_publish: ['发布时间','公告','操作'],
//  版本 控制
  history_version: ['发布时间','更新日记','下载地址','操作']
}
const mutations = {

}


const getters = {
  //左侧 菜单
  getRoomMenu: state =>{
    return state.room_card_menu
  },
  getProxyMenu: state => {
    return state.proxy_menu
  },
  getPlayerMenu: state => {
    return state.player_menu
  },
  getSystemMenu: state => {
    return state.system_information_menu
  },
  getVersionMenu: state => {
    return state.version_information_menu
  },
//  获取表格title
//  房间的
  getRoomFirst: state => {
    return state.room_all_account
  },
  getRoomSecond: state => {
    return state.room_sell_cards
  },
  getRoomThird: state => {
    return state.room_recharge_cards
  },
  getRoomFourth: stata =>{
    return stata.room_all_proxy
  },
  //代理的
  getProxyFirst: state => {
    return state.proxy_all
  },
  getProxySecond : state => {
    return state.proxy_add
  },
//  玩家de
  getPlayerFirst: state => {
    return state.player_information
  },
//  系统的
  getSystemFirst: state => {
    return state.game_publish
  },
//  版本控制
  getVersionFirst: state => {
    return state.history_version
  }

}

export default {
  state,
  mutations,
  getters
}

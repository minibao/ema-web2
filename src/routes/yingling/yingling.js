/**
 * Created by Administrator on 2017/9/21.
 */
var express = require('express');
var router = express.Router();
var tokenName = require('../../data/config.json').tokenName;

router.get('/', function (req, res, next) {
    res.render('yingling/login', {
        title: '英灵--登录',
        layout: 'layoutyinling',
        noFooter: true
    });
});

//英灵夺宝
router.get('/active2', function (req, res, next) {
    var token = req.cookies[tokenName];
    if (token) {
        res.render('yingling/active/active2', {
            title: '夺宝',
            layout: 'layoutyinling',
            tabFlag: 3
        });
    } else {
        //微信分享的战线，点击其它的按钮要去引导层
        res.redirect('/users/sharefuli');
    }
});

//英灵个人中心
router.get('/user', function (req, res, next) {
    res.render('yingling/userscenter', {
        title: '个人中心',
        layout: 'layoutyinling',
        tabFlag: 4
    });
});

//英灵战绩中心
router.get('/info', function (req, res, next) {
    res.render('yingling/info', {
        title: '英灵战绩中心',
        layout: 'layoutyinling',
        tabFlag: 1
    });
});

//英灵战绩中心--detail
router.get('/infoDetail', function (req, res, next) {
    res.render('yingling/info-detail', {
        title: '英灵战绩详情',
        layout: 'layoutyinling',
        noFooter: true
    });
});

module.exports = router;
'use strict';

import Base from './base.js';
import _ from "underscore";
var logger = require('tracer').colorConsole();

export default class extends Base {

  async __before() {
    let service = this.service("home/auth"),
      instance = new service(),
      status = await instance.status(); //校验是否登陆

    // if (status == "online") {
    //   this.redirect("/main");
    // }
  }

  async indexAction() {
    return this.display();
  }

  async authAction(self) {
    if (this.isGet()) {
      this.redirect("/");
    }
    let post = this.post();
    let ip = this.ip();
    let service = this.service("home/auth");
    let instance = new service();
    try {
      let status = await instance.auth(post.account, post.password, ip);
      if (status == "success") {
        this.redirect('/main');
      } else {
        this.assign("loginError", "账户或密码错误");
        this.display('index/index');
      }
    } catch (e) {
      logger.error(e);
      this.assign("loginError", e);
      this.display('index/index');
    }
  }
}
import Base from './base.js';

export default class extends Base {
  indexAction() {
    return this.display();
  }
  async addAction() {
    const user = this.model('thinkjsplus_category'); // controller 里实例化模型
    const data = await user.select();
    this.assign('category', data);
    return this.display();
  }
  /**
   * 保存分类
   */
  async saveAction() {
    const data = this.post();
    console.log(data);
    if (think.isEmpty(data.id)) {
      // 保存
      const res = await this.model('thinkjsplus_thing').add(data);
      if (res) {
        this.json({'succ': true});
      } else {
        this.json({'succ': false});
      }
    } else {
      // 更新
      const res = await this.model('thinkjsplus_thing').update(data);
      if (res) {
        this.json({'succ': true});
      } else {
        this.json({'succ': false});
      }
    }
  }
  /**
   * 查看事情
   */
  async listAction() {
    const user = this.model('thinkjsplus_thing'); // controller 里实例化模型
    const data = await user.select();
    return this.json(data);
  }
  /**
   * 删除事情
   */
  async delAction() {
    const thingModel = this.model('thinkjsplus_thing');
    const posts = this.post('id');
    const delNums = thingModel.where({id: ['IN', posts]}).delete();
    if (delNums) {
      this.json({'succ': true});
    } else {
      this.json({'succ': false});
    }
  }
};

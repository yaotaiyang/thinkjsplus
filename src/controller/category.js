import Base from './base.js';

export default class extends Base {
  indexAction() {
    return this.display();
  }
  async addAction() {
    return this.display();
  }
  /**
   * 保存分类
   */
  async saveAction() {
    const data = this.post();
    if (think.isEmpty(data.id)) {
      // 保存
      const res = await this.model('thinkjsplus_category').add(data);
      if (res) {
        this.json({'succ': true});
      } else {
        this.json({'succ': false});
      }
    } else {
      // 更新
      const res = await this.model('thinkjsplus_category').update(data);
      if (res) {
        this.json({'succ': true});
      } else {
        this.json({'succ': false});
      }
    }
  }
  /**
   * 删除分类
   */
  async delAction() {
    const categoryModel = this.model('thinkjsplus_category');
    const posts = this.post('id');
    const delNums = categoryModel.where({id: ['IN', posts]}).delete();
    if (delNums) {
      this.json({'succ': true});
    } else {
      this.json({'succ': false});
    }
  }
  /**
   * 查看分类
   */
  async listAction() {
    const user = this.model('thinkjsplus_category'); // controller 里实例化模型
    const data = await user.select();
    return this.json(data);
  }
};

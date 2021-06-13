import {observable, computed, action} from 'mobx';

class Order{
    @observable data = {
      name:  {
        label: "Name",
        value: "",
        pattern: /^[a-zA-Z ]{2,30}$/,
        status: ""
      },
      email: {
        label: "Email",
        value: "",
        pattern: /.+/,
        status: ""
      },
      phone: {
        label: "Phone",
        value: "",
        pattern: /^[0-9]{7,14}$/,
        status: ""
      }
    }
    @observable globalStatus = false;

    @computed get status() {
      return this.globalStatus;
    }

    @action changeData(name, value) {
        this.data[name].value = value;
    }
    @action changeStatus(name, value) {
      this.data[name].status = value;
      for (const name in this.data) {
        let field = this.data[name];
        if (field.status == false) {
          this.globalStatus = false;
          return
        }
      }
      this.globalStatus = true;
    }
}

export default new Order();


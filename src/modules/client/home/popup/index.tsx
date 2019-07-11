import * as React from "react";

import Modal from "@app/modules/admin/shared/layout/Modal";

const S = require("./style.scss");

interface IContactStates {
  email: string;
}

class ContacUs extends React.Component<{}, IContactStates> {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
    };
  }

  render() {
    return (
      <Modal isShow={false} style={{ width: "30%", padding: 16 }}>
        <Modal.Header onClose={() => {}} title="Đăng ký nhận thông tin" />
        <Modal.Body>
          <div className={S["contact-us"]}>
            <input name="age" type="number" placeholder="Tuổi" />
            <input
              name="email"
              type="email"
              placeholder="Thư điện tử"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button>AAA</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ContacUs;

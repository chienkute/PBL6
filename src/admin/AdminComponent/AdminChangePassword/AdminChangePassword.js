import React from "react";
import "./AdminChangePassword.scss";

class AdminChangePasswordDialogue extends React.Component {
  handleCloseCPD = () => {
    const { closeCPDmethod } = this.props;
    closeCPDmethod(false, ".CPDOverlayContainer");
  };
  render() {
    return (
      <div className="AdminChangePasswordDialogueContainer">
        <header className="ACPDHeader">
          <h3 className="bold">Đổi mật khẩu</h3>
        </header>
        <div className="ACPDContent">
          <div className="ACPDCols">
            <div className="ACPDAccount ACPDField">
              <div className="ACPDAccountLabel ACPDLabel">Tên tài khoản</div>
              <input type="text" id="ACPDAccountInput" disabled></input>
            </div>
          </div>
          <div className="ACPDCols">
            <div className="ACPDAccountType ACPDField">
              <div className="ACPDAccountTypeLabel ACPDLabel">
                Loại tài khoản
              </div>
              <input type="text" id="ACPDAccountTypeInput" disabled></input>
            </div>
          </div>
          <div className="ACPDCols">
            <div className="ACPDNewPassword ACPDField">
              <div className="ACPDNewPasswordLabel ACPDLabel">Mật khẩu mới</div>
              <input type="password" id="ACPDNewPasswordInput"></input>
            </div>
          </div>
          <div className="ACPDCols">
            <div className="ACPDNewPasswordConfirm ACPDField">
              <div className="ACPDNewPasswordConfirmLabel ACPDLabel">
                Xác nhận mật khẩu mới
              </div>
              <input type="password" id="ACPDNewPasswordConfirmInput"></input>
            </div>
          </div>
        </div>

        <div className="ACPDActions">
          <div className="ACPDWarning bold">
            Bạn chắc chắn muốn đổi mật khẩu chứ?{" "}
            <span className="bold" style={{ color: "red" }}>
              Hành động này không thể hoàn tác
            </span>
          </div>
          <div className="ACPDButtons">
            <button id="ACPDCancelButton" onClick={this.handleCloseCPD}>
              Huỷ
            </button>
            <button id="ACPDConfirmButton">Xác nhận</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminChangePasswordDialogue;

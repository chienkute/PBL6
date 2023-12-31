import React, { memo, useState, useEffect } from "react";
import "./UserManager.scss";
import { FaRegCheckSquare, FaEraser } from "react-icons/fa";
// import { FiEdit3 } from "react-icons/fi";
import { IoInformation } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import { addUser, deleteUser, getAllAcountUser } from "service/AdminService";
import ReactPaginate from "react-paginate";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { useParams } from "react-router-dom";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Button, Modal } from "react-bootstrap";
const UserManager = () => {
  // const { id } = useParams();
  const [showAddNewHospital, setShowAddNewHospital] = useState(false);
  const handleCloseAddNewHospital = () => setShowAddNewHospital(false);
  const handleShowAddNewHospital = () => setShowAddNewHospital(true);
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  // const [showBlock, setShowBlock] = useState(false);
  // const handleCloseBlock = () => setShowBlock(false);
  // const handleShowBlock = () => setShowBlock(true);
  const [search, setSearch] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfPassword, setIsShowConfPassword] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [idAccout, setIdAccount] = useState("");
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [targetAcc, setTargetAcc] = useState({});
  const [page, setPage] = useState(1);
  const handlePageClick = (event) => {
    setPage(+event.selected + 1);
    getAccount(+event.selected + 1);
  };
  const getAccount = async (page) => {
    let res = await getAllAcountUser((page - 1) * 6);
    if (res) {
      console.log(res);
      setTotalPage(res?.total_page);
      setCurrentPage(res?.current_page);
      setAccounts(res?.results);
      setTotal(res?.count);
      setCount(res?.count);
    }
  };
  const deleteAccouns = async (id) => {
    let res = await deleteUser(id);
    if (res) {
      console.log(res);
      getAccount(page);
      toast.success("Xóa thành công");
    } else {
      toast.error("Xóa thất bại");
    }
  };
  useEffect(() => {
    getAccount(1);
  }, []);
  useEffect(() => {
    if (search === "") {
      setCount(total);
    } else {
      setCount(filteredCategories.length);
    }
  }, [search]);
  const filteredCategories = accounts.filter((item) =>
    item?.account?.username?.toLowerCase().includes(search.toLowerCase()),
  );
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Bạn chưa nhập tài khoản")
        .min(6, "Tên tài khoản ít nhất phải chứa 6 ký tự hoặc hơn"),
      password: Yup.string()
        .required("Bạn chưa nhập mật khẩu")
        .min(6, "Mật khẩu không được ít hơn 6 ký tự"),
      confirmpasswd: Yup.string()
        .required("Bạn chưa nhập lại mật khẩu")
        .min(6, "Mật khẩu không được ít hơn 6 ký tự")
        .oneOf(
          [Yup.ref("password"), null],
          "Mật khẩu phải trùng khớp với nhau",
        ),
      email: Yup.string()
        .required("Bạn chưa nhập email")
        .matches(
          /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Vui lòng nhập đúng địa chỉ email",
        ),
    }),
    onSubmit: async (values) => {
      let res = await addUser(values.username, values.password, values.email);
      if (res) {
        console.log(res);
        formik.setValues({
          username: "",
          email: "",
          password: "",
          confirmpasswd: "",
        });
        if (res.hasOwnProperty("access_token")) {
          handleCloseAddNewHospital();
          getAccount(page);
          toast.success("Thêm thành công");
        } else {
          handleCloseAddNewHospital();
          toast.error("Đã tồn tại tài khoản hoặc email!");
        }
      } else {
        toast.error("Thêm thất bại");
      }
    },
  });
  return (
    <div className="AdminUserContainer">
      <div className="AdminUserFilter">
        <div className="management__search">
          <div className="management__input flex-center">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên tài khoản"
              id="care__ins"
              autoComplete="off"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="AdminUserFunction">
        <button id="AdminUserAddAccount" onClick={handleShowAddNewHospital}>
          <FaPlus /> Thêm tài khoản...
        </button>
        <Modal
          show={showAddNewHospital}
          onHide={handleCloseAddNewHospital}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Thêm mới người dùng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="add__form">
              <form action="">
                <div>
                  <div className="form__col">
                    <label htmlFor="">
                      Tài khoản <span className="validate">*</span>
                    </label>
                    <input
                      type="text"
                      id="username"
                      placeholder="Nhập tài khoản"
                      class="form-control"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      {...formik.getFieldProps("username")}
                      autoComplete="off"
                    />
                    <div className="form__error">
                      {formik.touched.username && formik.errors.username}
                    </div>
                  </div>
                  <div className="form__col">
                    <label htmlFor="">
                      Mật khẩu <span className="validate">*</span>
                    </label>
                    <div className="form__login_in">
                      <input
                        type={`${isShowPassword ? "text" : "password"}`}
                        id="password"
                        placeholder="Nhập mật khẩu"
                        class="form-control changePassword__form_input"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        {...formik.getFieldProps("password")}
                        autoComplete="off"
                      />
                      <div
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        className="changePassword__form_icon"
                      >
                        {isShowPassword ? (
                          <AiFillEye />
                        ) : (
                          <AiOutlineEyeInvisible />
                        )}
                      </div>
                      <div className="form__error">
                        {formik.touched.password && formik.errors.password}
                      </div>
                    </div>
                  </div>
                  <div className="form__col">
                    <label htmlFor="confirmpasswd">
                      Nhập lại mật khẩu <span className="validate">*</span>
                    </label>
                    <div className="forms__register_in">
                      <input
                        type={`${isShowConfPassword ? "text" : "password"}`}
                        className="form-control"
                        id="confirmpasswd"
                        placeholder="Nhập lại mật khẩu của bạn"
                        value={formik.values.confirmpasswd}
                        onChange={formik.handleChange}
                        {...formik.getFieldProps("confirmpasswd")}
                      />
                      <div
                        onClick={() =>
                          setIsShowConfPassword(!isShowConfPassword)
                        }
                      >
                        {isShowConfPassword ? (
                          <AiFillEye />
                        ) : (
                          <AiOutlineEyeInvisible />
                        )}
                      </div>
                      <div className="forms__register_error">
                        {formik.touched.confirmpasswd &&
                          formik.errors.confirmpasswd}
                      </div>
                    </div>
                  </div>
                  <div className="form__col">
                    <label htmlFor="">
                      Email <span className="validate">*</span>
                    </label>
                    <input
                      type="text"
                      id="email"
                      placeholder="Nhập email của bác sĩ"
                      class="form-control"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      {...formik.getFieldProps("email")}
                      autoComplete="off"
                    />
                    <div className="form__error">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddNewHospital}>
              Đóng
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              Lưu
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="AdminUserResult">
        <div className="ResultPerTable">
          {/* <label htmlFor="dropdown"></label> */}
          <label htmlFor="dropdown">Có {count} kết quả tìm được</label>
        </div>
        <div className="Table">
          <table>
            <tr>
              <th>
                <FaRegCheckSquare />
              </th>
              <th>STT</th>
              <th>Tên tài khoản</th>
              <th>Giới tính</th>
              <th>Địa chỉ</th>
              <th>Hành động</th>
            </tr>
            {accounts &&
              accounts.length > 0 &&
              filteredCategories.map((item, index) => {
                return (
                  <tr className="UnlockedAccount">
                    <td>
                      <input type="checkbox"></input>
                    </td>
                    <td>{(currentPage - 1) * 6 + index + 1}</td>
                    <td>{item?.account?.username}</td>
                    <td>
                      {item?.gender === true
                        ? "Nam"
                        : item?.gender === false
                          ? "Nữ"
                          : "Chưa có dữ liệu"}
                    </td>
                    <td style={{ maxWidth: "140px" }}>{item?.address}</td>
                    <td>
                      <div className="Action">
                        <button
                          className="InfoButton"
                          onClick={() => {
                            handleShowEdit();
                            setTargetAcc(item);
                          }}
                        >
                          <IoInformation />
                        </button>
                        <Modal
                          show={showEdit}
                          onHide={handleCloseEdit}
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>
                              Thông tin tài khoản người dùng
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="add__form">
                              <form action="">
                                <div className="form__col">
                                  <label htmlFor="">Tài khoản</label>
                                  <input
                                    type="text"
                                    id="username"
                                    class="form-control"
                                    autoComplete="off"
                                    defaultValue={targetAcc?.account?.username}
                                    disabled
                                  />
                                </div>
                                <div className="form__col">
                                  <label htmlFor="">Giới tính</label>
                                  <input
                                    type="text"
                                    id="gender"
                                    class="form-control"
                                    autoComplete="off"
                                    defaultValue={
                                      targetAcc?.gender === null
                                        ? ""
                                        : targetAcc?.gender
                                          ? "Nam"
                                          : "Nữ"
                                    }
                                    disabled
                                  />
                                </div>
                                <div className="form__col">
                                  <label htmlFor="">Ngày sinh</label>
                                  <input
                                    type="text"
                                    id="birthday"
                                    class="form-control"
                                    autoComplete="off"
                                    defaultValue={targetAcc?.birthday}
                                    disabled
                                  />
                                </div>
                                <div className="form__col">
                                  <label htmlFor="">Địa chỉ</label>
                                  <input
                                    type="text"
                                    id="address"
                                    class="form-control"
                                    autoComplete="off"
                                    defaultValue={targetAcc?.address}
                                    disabled
                                  />
                                </div>
                                <div className="form__col">
                                  <label htmlFor="">Số điện thoại</label>
                                  <input
                                    type="text"
                                    id="phone"
                                    class="form-control"
                                    autoComplete="off"
                                    defaultValue={targetAcc?.phone}
                                    disabled
                                  />
                                </div>
                                <div className="form__col">
                                  <label htmlFor="">Email</label>
                                  <input
                                    type="text"
                                    id="email"
                                    class="form-control"
                                    autoComplete="off"
                                    defaultValue={targetAcc?.account?.email}
                                    disabled
                                  />
                                </div>
                              </form>
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={handleCloseEdit}
                            >
                              Đóng
                            </Button>
                          </Modal.Footer>
                        </Modal>
                        {/* <button className="InfoButton">
                          <FiEdit3 />
                        </button> */}
                        {/* <button className="UnlockButton">
                          <FaUnlock />
                        </button> */}
                        {/* <button
                          className="LockButton"
                          onClick={handleShowBlock}
                        >
                          <FaLock />
                        </button> */}
                        {/* <Modal show={showBlock} onHide={handleCloseBlock}>
                          <Modal.Header closeButton>
                            <Modal.Title>
                              Bạn có muốn khóa tài khoản này không?
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Thao tác này không thể hoàn tác!!!
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={handleCloseBlock}
                            >
                              Hủy
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => {
                                handleCloseBlock();
                              }}
                            >
                              Xác nhận
                            </Button>
                          </Modal.Footer>
                        </Modal> */}
                        <button
                          className="DeleteAccount"
                          onClick={() => {
                            handleShowDelete();
                            setIdAccount(item?.id);
                          }}
                        >
                          <FaEraser />
                        </button>
                        <Modal show={showDelete} onHide={handleCloseDelete}>
                          <Modal.Header closeButton>
                            <Modal.Title>
                              Bạn có muốn xóa tài khoản này không?
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Thao tác này không thể hoàn tác!!!
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={handleCloseDelete}
                            >
                              Hủy
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => {
                                handleCloseDelete();
                                deleteAccouns(idAccout);
                              }}
                            >
                              Xác nhận
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
      <div className="management__pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={totalPage}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item previous"
          previousLinkClassName="page-link"
          nextClassName="page-item previous"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active active-pagination"
        />
      </div>
    </div>
  );
};

export default memo(UserManager);

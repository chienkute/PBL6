import { memo, useContext, useEffect, useState } from "react";
import "../HospitalPage/hospitalPage.scss";
import { MdKeyboardArrowRight } from "react-icons/md";
import hospitalImage from "../../../assets/hospital.jpg";
import hospitalBanner from "../../../assets/hospitalbanner.jpg";
import { CiLocationOn } from "react-icons/ci";
import chuyenkhoan from "../../../assets/ck.png";
import "../Care/care.scss";
import tienmat from "../../../assets/tienmat.png";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import hospavt from "../../../assets/hospital.jpg";
import doctorImg from "../../../assets/doctor/tat.jpg";
import { fetchAllSpecialties, search } from "service/UserService";
import { useParams } from "react-router-dom";
import { LoadingContext } from "context/LoadingContext";
import dakhoaImages from "../../../assets/chuyenkhoa/dakhoa.png";
import AppointmentBox from "../AppointmentBox/AppointmentBox";

const HospitalPage = () => {
  const { id } = useParams();
  const { loading, setLoading } = useContext(LoadingContext);
  const [specialty, setSpecialty] = useState("");
  const [specialtyy, setSpecialtyy] = useState("");
  const [specialties, setSpecialties] = useState(null);
  const [doctor, setDoctor] = useState([]);
  const [selectDoctor, setSelectDoctor] = useState("");
  const [doctorSearch, setDoctorSearch] = useState([]);
  const [show, setShow] = useState(false);
  const getDoctor = async () => {
    let res = await search("", "", specialty, "", id);
    if (res) {
      setDoctor(res?.results?.doctors);
    }
  };
  const getDoctorByIdHospital = async () => {
    let res = await search("", "", "", "", id);
    if (res) {
      setDoctorSearch(res?.results?.doctors);
    }
  };
  const getSpecialty = async () => {
    let res = await fetchAllSpecialties();
    if (res) {
      setSpecialties(res?.results);
    }
  };
  const handleClickSpeciaylty = (e) => {
    const Value = e.currentTarget.querySelector("p").innerText;
    setSpecialtyy(Value);
  };
  const handleClickDoctor = (e) => {
    const value = e.currentTarget.querySelector("p").innerText;
    setSelectDoctor(value);
  };
  useEffect(() => {
    getDoctor();
  }, [specialty]);
  useEffect(() => {
    getSpecialty();
    getDoctorByIdHospital();
    setLoading(false);
  }, []);
  return (
    <div>
      {loading ? (
        <div className="lds lds-doctor">
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="hospital">
          <div className="hospital__header">
            <div className="hospital__header_head">
              <a href="/care" className="hospital__header_head_text">
                Đặt lịch với bác sĩ
              </a>
              <div className="hospital__header_head_icon">
                <MdKeyboardArrowRight></MdKeyboardArrowRight>
              </div>
              <a href="/hospital" className="hospital__header_head_text2">
                <p>Phòng Khám ACC - Chiropractic Đà Nẵng</p>
              </a>
            </div>
          </div>
          <div className="hospital__body">
            <div className="hospital__body_image">
              <img src={hospitalBanner} alt="" />
            </div>
            <div className="hospital__body_header">
              <div className="hospital__body_header_image">
                <img src={hospitalImage} alt="" />
              </div>
              <div className="hospital__body_header_info">
                <h1>Phòng Khám ACC - Chiropractic Đà Nẵng</h1>
                <div className="hospital__body_header_location">
                  <div>
                    <CiLocationOn></CiLocationOn>
                  </div>
                  <div>
                    112 Đường 2 Tháng 9, phường Bình Thuận, Hải Châu, Đà Nẵng,
                    Viet Nam
                  </div>
                </div>
              </div>
            </div>
            <div className="hospital__body_line"></div>
            <div className="hospital__body_main">
              <ul
                class="nav nav-tabs hospital__body_list"
                id="ex1"
                role="tablist"
              >
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link active hospital__body_item"
                    id="tab-thongtin"
                    data-mdb-toggle="tab"
                    href="#tabs-thongtin"
                    role="tab"
                    aria-controls="tabs-thongtin"
                    aria-selected="true"
                  >
                    Thông tin chung
                  </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link hospital__body_item"
                    id="tab-dichvu"
                    data-mdb-toggle="tab"
                    href="#tabs-dichvu"
                    role="tab"
                    aria-controls="tabs-dichvu"
                    aria-selected="false"
                  >
                    Dịch vụ (1)
                  </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link hospital__body_item"
                    id="tab-bacsi"
                    data-mdb-toggle="tab"
                    href="#tabs-bacsi"
                    role="tab"
                    aria-controls="tabs-bacsi"
                    aria-selected="false"
                  >
                    Bác sĩ (1)
                  </a>
                </li>
              </ul>
              <div class="tab-content" id="ex1-content">
                <div
                  class="tab-pane fade show active hospital__body_thongtin"
                  id="tabs-thongtin"
                  role="tabpanel"
                  aria-labelledby="tab-thongtin"
                >
                  <div className="hospital__page">
                    <div>
                      <div className="hospital__body_thongtin_schedule">
                        <h2>Giờ làm việc</h2>
                        <div className="hospital__body_thongtin_time">
                          <p>Thứ Hai</p>
                          <p className="bolds">8:00 - 17:00</p>
                        </div>
                        <div className="hospital__body_thongtin_time">
                          <p>Thứ Ba</p>
                          <p className="bolds">8:00 - 17:00</p>
                        </div>
                        <div className="hospital__body_thongtin_time">
                          <p>Thứ Tư</p>
                          <p className="bolds">8:00 - 17:00</p>
                        </div>
                        <div className="hospital__body_thongtin_time">
                          <p>Thứ Năm</p>
                          <p className="bolds">8:00 - 17:00</p>
                        </div>
                        <div className="hospital__body_thongtin_time">
                          <p>Thứ Sáu</p>
                          <p className="bolds">8:00 - 17:00</p>
                        </div>
                        <div className="hospital__body_thongtin_time">
                          <p>Thứ Bảy</p>
                          <p className="bolds">8:00 - 17:00</p>
                        </div>
                        <div className="hospital__body_thongtin_time">
                          <p>Chủ Nhật</p>
                          <p className="bolds">Đóng cửa</p>
                        </div>
                      </div>
                      <div className="hospital__body_thongtin_desc">
                        <h2>Thông tin bệnh viện</h2>
                        <p>
                          Trải qua hơn 15 năm hoạt động, phòng khám ACC luôn tự
                          hào là sự lựa chọn hàng đầu của bệnh nhân với các dịch
                          vụ điều trị các bệnh lý kết hợp giữa Trị liệu thần
                          kinh cột sống và các bài tập Vật lý trị liệu, Trị liệu
                          phục hồi chức năng, điều trị thần kinh cột sống
                          chiropractic, thoát vị đĩa đệm, thoái hóa cột sống .
                        </p>
                        <p>
                          Các cơ sở của ACC đều có địa chỉ thuận tiện cho bệnh
                          nhân, được đầu tư cơ sở vật chất khang trang. Phòng
                          Khám ACC - Chiropractic Đà Nẵng là một trong các phòng
                          khám thuôc chuỗi Phòng khám ACC Việt Nam. Đặc biệt,
                          tại đây còn có phòng dành riêng cho Vật lý trị liệu,
                          Phục hồi chức năng rộng rãi, thoáng mát.
                        </p>
                      </div>
                      <div className="hospital__body_thongtin_chuyenkhoa">
                        <h2>Chuyên khoa</h2>
                        <ol className="row">
                          <li className="col-6">Thần kinh</li>
                          <li className="col-6">Thần kinh</li>
                          <li className="col-6">Thần kinh</li>
                          <li className="col-6">Thần kinh</li>
                          <li className="col-6">Thần kinh</li>
                          <li className="col-6">Thần kinh</li>
                          <li className="col-6">Thần kinh</li>
                          <li className="col-6">Thần kinh</li>
                        </ol>
                      </div>
                      <div className="hospital__body_thongtin_chuyenkhoa">
                        <h2>Cơ sở vật chất</h2>
                        <ol className="row">
                          <li className="col-6">Trị liệu thần kinh cột sống</li>
                          <li className="col-6">Vật lý trị liệu</li>
                          <li className="col-6">Tập hồi phục chức năng</li>
                        </ol>
                      </div>
                      <div>
                        <h2>Hình thức thanh toán</h2>
                        <div className="hospital__body_thongtin_thanhtoan">
                          <div className="hospital__body_thongtin_phuongthuc">
                            <div className="hospital__body_thongtin_img">
                              <img src={chuyenkhoan} alt="" />
                            </div>
                            <p>Chuyển khoản</p>
                          </div>
                          <div className="hospital__body_thongtin_phuongthuc">
                            <div className="hospital__body_thongtin_img">
                              <img src={tienmat} alt="" />
                            </div>
                            <p>Tiền mặt</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hospital__schedule">
                      <h5>Đặt lịch ngay</h5>
                      <p className="hospital__schedule_content">
                        Lựa chọn bác sĩ phù hợp, dịch vụ y tế cần khám và tiến
                        hành đặt lịch ngay.
                      </p>
                      <div className="hospital__schedule_chuyenkhoa">
                        <p>Chuyên khoa</p>
                        <div
                          className="care__banner_button hospital__schedule_banner"
                          style={{ width: "100%" }}
                        >
                          <div className="care__banner_input flex-center dropdown">
                            <input
                              type="text"
                              placeholder="Tìm kiếm theo chuyên khoa"
                              id="care__in"
                              data-mdb-toggle="dropdown"
                              value={`${specialtyy}`}
                              autoComplete="off"
                            ></input>
                            <ul
                              class="dropdown-menu care__banner_menu search_menu"
                              aria-labelledby="care_in"
                            >
                              <li>
                                <a
                                  class="dropdown-item care__banner_menu_title"
                                  onClick={(e) => {
                                    const pValue =
                                      e.currentTarget.querySelector(
                                        "p"
                                      ).innerText;
                                    setSpecialtyy(pValue);
                                    setSpecialty("");
                                  }}
                                >
                                  <div className="img_chuyenkhoa">
                                    <img src={dakhoaImages} alt="" />
                                  </div>
                                  <p style={{ fontSize: "14px" }}>
                                    Tất cả chuyên khoa
                                  </p>
                                </a>
                                <div className="care__banner_menu_title_line"></div>
                              </li>
                              {specialties &&
                                specialties.map((item, index) => (
                                  <li key={index}>
                                    <a
                                      class="dropdown-item care__banner_menu_title"
                                      onClick={(e) => {
                                        handleClickSpeciaylty(e);
                                        setSpecialty(item.id);
                                      }}
                                    >
                                      <div className="img_chuyenkhoa">
                                        <img src={dakhoaImages} alt="" />
                                      </div>
                                      <p style={{ fontSize: "14px" }}>
                                        {item.name}
                                      </p>
                                    </a>
                                    <div className="care__banner_menu_title_line"></div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="hospital__schedule_bacsi">
                        <p>Bác sĩ</p>
                        <div
                          className="care__banner_button hospital__schedule_banner"
                          style={{ width: "100%" }}
                        >
                          <div className="care__banner_input flex-center dropdown">
                            <input
                              type="text"
                              placeholder="Tìm kiếm bác sĩ"
                              id="care__in"
                              data-mdb-toggle="dropdown"
                              value={`${selectDoctor}`}
                              autoComplete="off"
                            ></input>
                            <ul
                              class="dropdown-menu care__banner_menu search_menu"
                              aria-labelledby="care_in"
                            >
                              <li>
                                <div className="care__banner_menu_title_line"></div>
                              </li>
                              {doctor &&
                                doctor.map((item, index) => (
                                  <li key={index}>
                                    <a
                                      class="dropdown-item care__banner_menu_title"
                                      onClick={(e) => {
                                        handleClickDoctor(e);
                                        setSpecialty(item.id);
                                        setShow(true);
                                      }}
                                    >
                                      <div className="img_chuyenkhoa">
                                        <img src={dakhoaImages} alt="" />
                                      </div>
                                      <p style={{ fontSize: "14px" }}>
                                        {item.name}
                                      </p>
                                    </a>
                                    <div className="care__banner_menu_title_line"></div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      {show ? (
                        <div className="hospital__schedule_day">
                          <AppointmentBox></AppointmentBox>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade hospital__body_dichvu"
                  id="tabs-dichvu"
                  role="tabpanel"
                  aria-labelledby="tab-dichvu"
                >
                  <div className="care__banner_button">
                    <div className="care__banner_input flex-center">
                      <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        id="care__ins"
                      ></input>
                    </div>
                  </div>
                  <div className="hospital__body_dichvu_result">
                    <div className="hospital__body_dichvu_info">
                      <a href="/care/dich-vu">Thăm khám và tư vấn</a>
                      <div className="hospital__body_dichvu_price">
                        <div className="hospital__body_dichvu_price_icon">
                          <RiMoneyDollarCircleLine></RiMoneyDollarCircleLine>
                        </div>
                        <p>800.000</p>
                      </div>
                    </div>
                    <div className="hospital__body_dichvu_bottom">
                      <div className="hospital__body_dichvu_bottom_avtHosp">
                        <img src={hospavt} alt="" />
                      </div>
                      <div className="hospital__body_dichvu_bottom_descrip">
                        <a href="#">Phòng Khám ACC - Chiropractic Đà Nẵng</a>
                        <p>
                          112 Đường 2 Tháng 9, phường Bình Thuận, Hải Châu, Đà
                          Nẵng, Viet Nam
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn button hospital__body_dichvu_bottom_button"
                      >
                        Đặt Lịch Hẹn
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  class="tab-pane fade hospital__body_bacsi"
                  id="tabs-bacsi"
                  role="tabpanel"
                  aria-labelledby="tab-bacsi"
                >
                  <div className="care__banner_button">
                    <div className="care__banner_input flex-center">
                      <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        id="care__ins"
                        autoComplete="off"
                      ></input>
                    </div>
                  </div>
                  {doctorSearch &&
                    doctorSearch.length > 0 &&
                    doctorSearch.map((item, index) => {
                      return (
                        <div className="hospital__body_bacsi_result">
                          <div
                            role="button"
                            className="hospital__body_bacsi_content"
                          >
                            <div className="hospital__body_bacsi_content_avt">
                              <img src={doctorImg} alt="" />
                            </div>
                            <div className="hospital__body_bacsi_content_info">
                              <p className="hospital__body_bacsi_content_info_name">
                                {item.name}
                              </p>
                              <p className="hospital__body_bacsi_content_info_ck">
                                Thần kinh, Y học phục hồi chức năng
                              </p>
                              <div className="hospital__body_bacsi_content_info_price">
                                <div className="hospital__body_bacsi_content_info_icon">
                                  <RiMoneyDollarCircleLine></RiMoneyDollarCircleLine>
                                </div>
                                <p>Phí tư vấn cố định</p>
                                <p className="hospital__body_bacsi_content_info_cost">
                                  800.000
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            role="button"
                            className="hospital__body_dichvu_bottom"
                          >
                            <div className="hospital__body_dichvu_bottom_avtHosp">
                              <img src={hospavt} alt="" />
                            </div>
                            <div className="hospital__body_dichvu_bottom_descrip">
                              <a href="#">
                                Phòng Khám ACC - Chiropractic Đà Nẵng
                              </a>
                              <p>
                                112 Đường 2 Tháng 9, phường Bình Thuận, Hải
                                Châu, Đà Nẵng, Viet Nam
                              </p>
                            </div>
                            <button
                              type="button"
                              className="btn button hospital__body_dichvu_bottom_button"
                            >
                              Đặt Lịch Hẹn
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default memo(HospitalPage);

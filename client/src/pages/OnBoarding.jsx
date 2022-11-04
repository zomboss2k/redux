import React from "react";
import Nav from "../components/Nav";

const handleSubmit = () => {};

const Dashboard = () => {
  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />

      <div className="onboarding">
        <h2>TẠO TÀI KHOẢN</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">HỌ VÀ TÊN</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value=""
              onChange=""
            />

            <label>Ngày sinh</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="Ngày"
                required={true}
                value=""
                onChange=""
              />

              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="Tháng"
                required={true}
                value=""
                onChange=""
              />

              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="Năm"
                required={true}
                value=""
                onChange=""
              />
            </div>

            <label>Giới tính</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                value="man"
                onChange=""
                checked=""
              />
              <label htmlFor="man-gender-identity">Nam</label>
              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                value="woman"
                onChange=""
                checked=""
              />
              <label htmlFor="woman-gender-identity">Nữ</label>
              <input
                id="more-gender-identity"
                type="radio"
                name="gender_identity"
                value="more"
                onChange=""
                checked=""
              />
              <label htmlFor="more-gender-identity">Khác</label>
            </div>

            <label htmlFor="show-gender">
              Hiển thị giới tính trên hồ sơ của bạn
            </label>
            <input
              id="show-gender"
              type="checkbox"
              name="show_gender"
              onChange=""
              checked=" "
            />

            <label>Giới tính được hiển thị</label>

            <div className="multiple-input-container">
              <input
                id="man-gender-interest"
                type="radio"
                name="gender_interest"
                value="man"
                onChange=""
                checked=""
              />
              <label htmlFor="man-gender-interest">Nam</label>
              <input
                id="woman-gender-interest"
                type="radio"
                name="gender_interest"
                value="woman"
                onChange=""
                checked=""
              />
              <label htmlFor="woman-gender-interest">Nữ</label>
              <input
                id="everyone-gender-interest"
                type="radio"
                name="gender_interest"
                value="everyone"
                onChange=""
                checked=""
              />
              <label htmlFor="everyone-gender-interest">Mọi người</label>
            </div>

            <label htmlFor="about">Giới thiệu</label>
            <textarea
              id="about"
              name="about"
              required={true}
              placeholder="Nói gì về bạn...."
              value=""
              onChange=""
              rows="4"
              cols="50"
            />

            <input type="submit" />
          </section>

          <section>
            <label htmlFor="url">Ảnh đại diện</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange=""
              placeholder="Link hình ảnh của bạn"
              required={true}
            />
            <div className="photo-container">
              {/* {formData.url && (
                <img src={formData.url} alt="Xem trước ảnh đại diện" />
              )} */}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default Dashboard;

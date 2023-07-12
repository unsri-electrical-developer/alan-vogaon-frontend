import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, TextField, Grid, Card } from "@material-ui/core";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import RichTextEditor from "../../../../matx/components/RichTextEditor";
import {
  addGeneralInfo,
  getGeneralInfo,
} from "../../../redux/actions/Settings";
import { UploadImage } from "../../../components";

const GeneralInfo = () => {
  const dispatch = useDispatch();
  const { dataGeneralInfo } = useSelector((state) => state.generalInfo);
  // console.log(dataGeneralInfo);

  const [aboutDetail, setAbout] = useState({
    body: "",
    meta_title: "",
    meta_desc: "",
    meta_keyword: "",
    logo: "",
    logo_preview: "",
    favicon: "",
    favicon_preview: "",
    footer_logo: "",
    footer_logo_preview: "",
  });
  const [state, setState] = useState({
    contact_whatsapp: "",
    contact_telegram: "",
    contact_email: "",
    contact_message: "",
    social_contact_instagram: "",
    social_contact_facebook: "",
    social_contact_tiktok: ""
  });

  const getData = () => {
    dispatch(getGeneralInfo());
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (dataGeneralInfo.hasOwnProperty("about")) {
      const { about, contact, social_contact } = dataGeneralInfo;
      console.log('abt',about);

      const contactValue = (params) => {
        const value = contact.filter(
          (data) => data?.contact_code === params
        )[0];
        // console.log(value);
        return value?.contact_url;
      };

      const socialContactValue = (params) => {
        const value = social_contact.filter(
          (data) => data?.social_contact_code === params
        )[0];
        // console.log(value);
        return value?.social_contact_url;
      };

      setAbout(about);
      setState((prev) => ({
        ...prev,
        // about: about,
        contact_whatsapp: contactValue("whatsapp"),
        contact_telegram: contactValue("telegram"),
        contact_email: contactValue("email"),
        contact_message: contactValue("message"),
        social_contact_instagram: socialContactValue("instagram"),
        social_contact_facebook: socialContactValue("facebook"),
        social_contact_tiktok: socialContactValue("tiktok"),
      }));
    }
  }, [dataGeneralInfo]);

  const handleChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChangeContent = (e, name) => {
    setAbout(
      (prev) => ({
        ...prev,
        [name]: e,
      }),
      console.log(aboutDetail)
    );
  };
  const handleChangeContentMetaTitle = (e) => {
    e.persist();
    setAbout((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const history = useHistory();

  const handleSubmit = async () => {
    console.log(aboutDetail);
    try {
      const obj = {
        about: aboutDetail,
        contact: [
          {
            contact_code: "whatsapp",
            contact_url: state.contact_whatsapp,
          },
          {
            contact_code: "telegram",
            contact_url: state.contact_telegram,
          },
          {
            contact_code: "email",
            contact_url: state.contact_email,
          },
          {
            contact_code: "message",
            contact_url: state.contact_message,
          },
        ],
        social_contact: [
          {
            social_contact_code: "facebook",
            social_contact_url: state.social_contact_facebook,
          },
          {
            social_contact_code: "tiktok",
            social_contact_url: state.social_contact_tiktok,
          },
          {
            social_contact_code: "instagram",
            social_contact_url: state.social_contact_instagram,
          },
        ],
      };

      await addGeneralInfo(obj).then((res) => {
        // console.log(res);
        Swal.fire("Success!", "Data General Info berhasil disimpan", "success");
        getData();
        handleChangeLogo('', aboutDetail.logo_preview)
        handleChangeFavicon('', aboutDetail.favicon_preview)
        handleChangeFooterLogo('', aboutDetail.footer_logo_preview)
      });
    } catch (e) {
      Swal.fire("Oopss!", "Data General Info gagal disimpan", "error");
    }
  };

  const handleChangeLogo = (file, path) => {
    setAbout({
      ...aboutDetail,
      logo: file,
      logo_preview: path,
    });
  };

  const handleChangeFavicon = (file, path) => {
    setAbout({
      ...aboutDetail,
      favicon: file,
      favicon_preview: path,
    });
  };

  const handleChangeFooterLogo = (file, path) => {
    setAbout({
      ...aboutDetail,
      footer_logo: file,
      footer_logo_preview: path,
    });
  };

  return (
    <div className="m-sm-30">
      <Grid
        container
        spacing={3}
        className="my-8 mx-auto px-2"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm>
          <h1 className="fw-600 text-25 text-black">General Information</h1>
        </Grid>
        <Grid item xs={12} sm className="d-flex mr-4 justify-end">
          <Button
            variant="contained"
            color="primary"
            className="px-15 py-3 text-white fw-500 border-radius-4"
            onClick={handleSubmit}
          >
            <span className="">Save</span>
          </Button>
        </Grid>
      </Grid>
      <div className="my-8">
        <Card className="py-8 bg-white">
          <div className="mx-8 px-10 mb-8 bg-white">
            <Grid
              container
              spacing={5}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12}>
                <h3 className="mb-5 fw-500 text-15 text-black">
                  Tentang Vogaon
                </h3>
                <RichTextEditor
                  content={
                    // state.about.hasOwnProperty("body")
                    //   ?
                    aboutDetail.body
                    // : state.about
                  }
                  placeholder=""
                  handleContentChange={(e) => handleChangeContent(e, "body")}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <h3 className="mb-5 fw-500 text-15 text-black">Meta Title</h3>
                <TextField
                  required={true}
                  size="small"
                  InputProps={{
                    style: {
                      borderRadius: 5,
                      minHeight: 46,
                    },
                  }}
                  className="w-full"
                  value={aboutDetail?.meta_title}
                  name="meta_title"
                  placeholder="Meta Title"
                  variant="outlined"
                  onChange={handleChangeContentMetaTitle}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <h3 className="mb-5 fw-500 text-15 text-black">
                  Meta Description
                </h3>
                <RichTextEditor
                  content={
                    // state.about.hasOwnProperty("meta_description")
                    //   ?
                    aboutDetail?.meta_desc
                    // : state.about
                  }
                  placeholder=""
                  handleContentChange={(e) =>
                    handleChangeContent(e, "meta_desc")
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <h3 className="mb-5 fw-500 text-15 text-black">Meta Keyword</h3>
                <RichTextEditor
                  content={
                    // state.about.hasOwnProperty("meta_keyword")
                    // ?
                    aboutDetail?.meta_keyword
                    // : state.about
                  }
                  placeholder=""
                  handleContentChange={(e) =>
                    handleChangeContent(e, "meta_keyword")
                  }
                />
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
      <div className="my-8">
        <Card className="py-8 bg-white">
          <div className="mx-8 px-10 mb-8 bg-white">
            <Grid
              container
              spacing={5}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12}>
                <h3 className="mb-1 fw-500 text-20 text-black">Logo</h3>
              </Grid>
              <Grid item sm={12} md={6}>
                <h1
                  className="font-semimedium text-14"
                  style={{ color: "#0a0a0a" }}
                >
                  Unggah Logo
                </h1>
                <UploadImage
                  uploadFoto={handleChangeLogo}
                  label="Logo"
                  preview={aboutDetail.logo_preview}
                  formatIcon={false}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <h1
                  className="font-semimedium text-14"
                  style={{ color: "#0a0a0a" }}
                >
                  Unggah Favicon
                </h1>
                <UploadImage
                  uploadFoto={handleChangeFavicon}
                  label="Favicon"
                  preview={aboutDetail.favicon_preview}
                  formatIcon={false}
                />
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
      <div className="my-8">
        <Card className="py-8 bg-white">
          <div className="mx-8 px-10 mb-8 bg-white">
            <Grid
              container
              spacing={5}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12}>
                <h3 className="mb-1 fw-500 text-20 text-black">Contact</h3>
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">Whatsapp</h3>
                <TextField
                  required={true}
                  size="small"
                  InputProps={{
                    style: {
                      borderRadius: 5,
                      minHeight: 46,
                    },
                  }}
                  className="w-full"
                  value={state.contact_whatsapp}
                  name="contact_whatsapp"
                  placeholder="Whatsapp"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">Telegram</h3>
                <TextField
                  required={true}
                  size="small"
                  InputProps={{
                    style: {
                      borderRadius: 5,
                      minHeight: 46,
                    },
                  }}
                  className="w-full"
                  value={state.contact_telegram}
                  name="contact_telegram"
                  placeholder="Telegram"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">Email</h3>
                <TextField
                  required={true}
                  size="small"
                  InputProps={{
                    style: {
                      borderRadius: 5,
                      minHeight: 46,
                    },
                  }}
                  className="w-full"
                  value={state.contact_email}
                  name="contact_email"
                  placeholder="Email"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">Telepon</h3>
                <TextField
                  required={true}
                  size="small"
                  InputProps={{
                    style: {
                      borderRadius: 5,
                      minHeight: 46,
                    },
                  }}
                  className="w-full"
                  value={state.contact_message}
                  name="contact_message"
                  placeholder="Telepon"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
      <div className="my-8">
        <Card className="py-8 bg-white">
          <div className="mx-8 px-10 mb-8 bg-white">
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={12} sm={12}>
                <h3 className="mb-1 fw-500 text-20 text-black">Social Media</h3>
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">Instagram</h3>
                <TextField
                  required={true}
                  size="small"
                  InputProps={{
                    style: {
                      borderRadius: 5,
                      minHeight: 46,
                    },
                  }}
                  className="w-full"
                  value={state.social_contact_instagram}
                  name="social_contact_instagram"
                  placeholder="Instagram"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">Facebook</h3>
                <TextField
                  required={true}
                  size="small"
                  InputProps={{
                    style: {
                      borderRadius: 5,
                      minHeight: 46,
                    },
                  }}
                  className="w-full"
                  value={state.social_contact_facebook}
                  name="social_contact_facebook"
                  placeholder="Facebook"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 className="mb-5 fw-500 text-15 text-black">TikTok</h3>
                <TextField
                  required={true}
                  size="small"
                  InputProps={{
                    style: {
                      borderRadius: 5,
                      minHeight: 46,
                    },
                  }}
                  className="w-full"
                  value={state.social_contact_tiktok}
                  name="social_contact_tiktok"
                  placeholder="TikTok"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
            </Grid>
          </div>
        </Card>
      </div>
      <div className="my-8">
        <Card className="py-8 bg-white">
          <div className="mx-8 px-10 mb-8 bg-white">
            <Grid
              container
              spacing={5}
              justifyContent="left"
              alignItems="left"
            >
              <Grid item xs={12} sm={12}>
                <h3 className="mb-1 fw-500 text-20 text-black">Footer</h3>
              </Grid>
              <Grid item sm={12} md={6}>
                <h1
                  className="font-semimedium text-14"
                  style={{ color: "#0a0a0a" }}
                >
                  Unggah Logo Footer
                </h1>
                <UploadImage
                  uploadFoto={handleChangeFooterLogo}
                  label="Footer Logo"
                  preview={aboutDetail.footer_logo_preview}
                  formatIcon={false}
                />
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GeneralInfo;

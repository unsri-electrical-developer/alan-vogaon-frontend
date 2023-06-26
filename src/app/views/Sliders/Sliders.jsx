import { Card, Grid, Icon } from "@material-ui/core";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadImageWithButton } from "../../components";
import {
  getSliders,
  addSlider,
  updateSlider,
  deleteSlider,
} from "../../redux/actions/SlidersAction";
import Swal from "sweetalert2";

const Sliders = () => {
  const dispatch = useDispatch();
  const { dataSliders } = useSelector((state) => state.sliders);
  const getData = () => {
    dispatch(getSliders());
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus",
      text: "Apakah kamu yakin",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
      icon: "warning",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteSlider(id)
          .then((res) => {
            if (res.data.code == 0) {
              Swal.fire({
                title: "Berhasil",
                text: "Data berhasil dihapus",
                timer: 2000,
                icon: "success",
              });
            }

            getData();
          })
          .catch((err) => {
            Swal.fire({
              title: "gagal",
              text: "Data Gagal dihapus",
              timer: 2000,
              icon: "error",
            });
          });
      }
    });
  };

  const [state, setState] = useState({});

  const handleChangePhoto = (file, path, id) => {
    if (id === "New") {
      addSlider({
        image: file,
      }).then((res) => {
        getData();
      });
    } else {
      updateSlider(id, {
        image: file,
      }).then((res) => {
        getData();
      });
    }
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (dataSliders.length > 0) {
      let obj = {};
      for (let i = 0; i < dataSliders.length; i++) {
        obj = {
          ...obj,
          [`preview${dataSliders[i].id}`]: dataSliders[i].image,
        };
      }
      obj = {
        ...obj,
        [`previewNew`]: "",
      };

      setState((prev) => ({
        ...prev,
        ...obj,
      }));
    }
  }, [dataSliders]);

  return (
    <div className="m-sm-30 mt-7 text-black">
      <Grid
        container
        spacing={3}
        className="mb-4 mx-auto px-2"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={12} sm>
          <h1 className="text-black fw-600 text-25 my-4">Sliders/Banner</h1>
        </Grid>
      </Grid>

      <Card className="mt-5 py-10 px-10">
        <Grid container spacing={3}>
          {dataSliders.length > 0 &&
            dataSliders.map((data, index) => (
              <Grid item xs={11} md={6} key={data.id}>
                <h5 className="fw-500">Banner {index + 1}</h5>
                <UploadImageWithButton
                  uploadFoto={handleChangePhoto}
                  preview={state[`preview${data.id}`]}
                  formatIcon={false}
                  state={{ index: index + 1, id: data.id }}
                  handleDelete={handleDelete}
                  getData={getData}
                />
              </Grid>
            ))}
          <Grid item xs={11} md={6}>
            <h5 className="fw-500">Banner {dataSliders.length + 1}</h5>
            <UploadImageWithButton
              uploadFoto={handleChangePhoto}
              preview={state[`previewNew`]}
              formatIcon={false}
              state={{ index: "New", id: "New" }}
              handleDelete={handleDelete}
              getData={getData}
            />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Sliders;

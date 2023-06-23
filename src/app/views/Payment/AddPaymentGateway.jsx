import React, { useState } from "react";
import { Button, TextField, Grid, Card } from "@material-ui/core";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { addPaymentGateway } from "../../redux/actions/Payment/PaymentGatewayActions";

const AddPaymentGateway = () => {
  const [state, setState] = useState({
    pg_name: "",
  });

  const handleChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const history = useHistory();

  const handleSubmit = () => {
    try {
      addPaymentGateway({
        pg_name: state.pg_name,
      }).then((res) => {
        history.push("/payment_gateway");
        Swal.fire(
          "Success!",
          "Data Payment Gateway berhasil ditambah",
          "success"
        );
      });
    } catch (e) {
      Swal.fire("Oopss!", "Data Payment Gateway gagal ditambah", "error");
    }
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
          <h1 className="fw-600 text-25 text-black">Add Payment Gateway</h1>
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
        <Card className="py-15">
          <div className="mx-8 px-10 mt-5 mb-8">
            <Grid
              container
              spacing={3}
              alignItems="center"
              justifyContent="space-between"
              className="mb-8"
            >
              <Grid
                container
                className="mt-2"
                spacing={5}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} sm>
                  <h1 className="mb-5 fw-500 text-15 text-black">
                    Payment Gateway
                  </h1>
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
                    value={state.jenis_bonus}
                    name="pg_name"
                    placeholder="Payment Gateway"
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddPaymentGateway;

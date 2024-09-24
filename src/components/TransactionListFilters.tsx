import React from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import { TransactionAmountRangePayload, TransactionDateRangePayload } from "../models";
import TransactionListDateRangeFilter from "./TransactionDateRangeFilter";
import TransactionListAmountRangeFilter from "./TransactionListAmountRangeFilter";
import { debounce } from "lodash/fp";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export type TransactionListFiltersProps = {
  sendFilterEvent: Function;
  dateRangeFilters: TransactionDateRangePayload;
  amountRangeFilters: TransactionAmountRangePayload;
};

const TransactionListFilters: React.FC<TransactionListFiltersProps> = ({
  sendFilterEvent,
  dateRangeFilters,
  amountRangeFilters,
}) => {
  const classes = useStyles();

  const filterDateRange = (payload: TransactionDateRangePayload) =>
    sendFilterEvent("DATE_FILTER", payload);
  const resetDateRange = () => sendFilterEvent("DATE_RESET");

  const filterAmountRange = debounce(200, (payload: TransactionAmountRangePayload) =>
    sendFilterEvent("AMOUNT_FILTER", payload)
  );
  const resetAmountRange = () => sendFilterEvent("AMOUNT_RESET");

  return (
    <Paper className={classes.paper} elevation={0}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid item>
          <TransactionListDateRangeFilter
            filterDateRange={filterDateRange}
            dateRangeFilters={dateRangeFilters}
            resetDateRange={resetDateRange}
          />
        </Grid>
        <Grid item>
          <TransactionListAmountRangeFilter
            filterAmountRange={filterAmountRange}
            amountRangeFilters={amountRangeFilters}
            resetAmountRange={resetAmountRange}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TransactionListFilters;

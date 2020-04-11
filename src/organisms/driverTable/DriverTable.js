import { Checkbox, makeStyles, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { driverHeadCells } from '../../constants/headCells';
import EnhancedTableHead from '../../molecule/enhancedTableHead/EnhancedTableHead';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}))

function DriverTable(props) {

    const classes = useStyles();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('numberOfRequest');
    // const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { drivers, selected, setSelected } = props;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, drivers.length - page * rowsPerPage);

    const isSelected = (id) => selected.indexOf(id) !== -1;

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        // if (event.target.checked) {
        //     const newSelecteds = drivers.map((n) => n.id);
        //     setSelected(newSelecteds);
        //     return;
        // }
        // setSelected([]);
    }

    const handleDetailClick = (driver) => {

    }

    const handleClick = (event, name) => {

        let newSelected = [name]

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <TableContainer>
                <Table
                    className={classes.table}
                    size={'medium'}
                >
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={drivers.length}
                        headCells={driverHeadCells}
                        isDisableCheckAll={true}
                    />
                    <TableBody>
                        {stableSort(drivers, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left" padding="none">{row.employeeCode}</TableCell>
                                        <TableCell align="left" padding="none">{row.phone}</TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="default"
                                                component="span"
                                                onClick={() => handleDetailClick(row)}
                                            >
                                                <CreateIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={drivers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
            />
        </div>
    )
}

DriverTable.propTypes = {
    drivers: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
    setSelected: PropTypes.func.isRequired,
}

export default DriverTable;
import { Checkbox, FormControl, IconButton, InputLabel, makeStyles, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { trashAreaHeadCells, trashAreaStatusHeadCells } from '../../constants/headCells';
import EnhancedTableHead from '../../molecule/enhancedTableHead/EnhancedTableHead';
import { isToday } from '../../utils/dateUtil';
import TrashAreaDetailDialog from '../dialog/TrashAreaDetailDialog';
import { getCollectStatusAvatar } from '../../utils/statusUtil';
import { getTrashTypeName } from '../../utils/trashTypeUtil';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
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

function TrashAreaStatusTable(props) {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('numberOfRequest');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { trashAreas } = props;

    const [districts, setDistricts] = useState(['']);
    const [selectedDistrict, setSelectedDistrict] = useState('');

    const [displayTrashAreas, setDisplayTrashAreas] = useState([]);

    useEffect(() => {
        getDistricts();
    }, []);

    const getDistricts = () => {
        let newDistricts = [];

        trashAreas.map((trashArea) => {
            if (!(newDistricts.includes(trashArea.district))) {
                newDistricts = newDistricts.concat(trashArea.district);
            }
        })
        setDistricts(newDistricts);
        setSelectedDistrict(newDistricts[0]);
        setNewDistrict(newDistricts[0]);
    }

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

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
        setNewDistrict(event.target.value);
    }

    const setNewDistrict = (district) => {
        let newDisplayTrashArea = [];

        trashAreas.map(trashArea => {
            if (trashArea.district === district) {
                newDisplayTrashArea.push(trashArea);
            }
        })

        setDisplayTrashAreas(newDisplayTrashArea);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, trashAreas.length - page * rowsPerPage);


    const classes = useStyles();

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>District</InputLabel>
                <Select
                    value={selectedDistrict}
                    label="District"
                    onChange={handleDistrictChange}
                >
                    {districts.map((district) => (
                        <MenuItem key={district} value={district}>
                            {district}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TableContainer>
                <Table
                    className={classes.table}
                    size={'medium'}
                >
                    <EnhancedTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={displayTrashAreas.length}
                        headCells={trashAreaStatusHeadCells}
                        isCheckBoxAll={false}
                    />
                    <TableBody>
                        {stableSort(displayTrashAreas, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        <TableCell align="left" padding="default">{row.streetNumber}</TableCell>
                                        <TableCell align="left">{row.street}</TableCell>
                                        <TableCell align="left">{row.size}</TableCell>
                                        <TableCell align="left">{row.width}</TableCell>
                                        <TableCell align="left">{getTrashTypeName(row.type.name)}</TableCell>
                                        <TableCell align="center">{row.numberOfRequest}</TableCell>
                                        <TableCell align="center">
                                            {getCollectStatusAvatar(row.status.name)}
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
                count={trashAreas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
            />
        </div>
    )
}

TrashAreaStatusTable.defaultProps = {
    trashAreas: [],
}

TrashAreaStatusTable.propTypes = {
    trashAreas: PropTypes.array.isRequired,
}

export default TrashAreaStatusTable;
import * as React from 'react';
import { styled } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { get_pages } from '../../api/pages';

export function PageList({setPageSelected}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const [pages, setPages] = React.useState([]);
  const [pagesCant, setPagesCant] = React.useState(0);


  const offset = () => {
    if (rowsPerPage < 0) {
        return pagesCant
    }
    else{
        return page*rowsPerPage
    }
  }

  React.useEffect(() => {
    get_pages(page, rowsPerPage, offset()).then(({ data }) => {
        console.log(data)
        setPages(data.results)
        setPagesCant(data.count)
      }).catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.error(error.response.data)
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      })

  }, [page, rowsPerPage]);

  const handleRowClick = (page_pk) => {
    setPageSelected(page_pk)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Root sx={{ maxWidth: '100%', width: 500 }}>
      <table aria-label="custom pagination table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Total links</th>
          </tr>
        </thead>
        <tbody>
          {(pages).map((page) => {
            return page.state === "IN_PROCESS" ?
            <tr key={page.id}>
              <td style={{ width: 450 }} align="right" >
                {page.name}
              </td>
              <td style={{ width: 160 }} align="right">
                {page.state}
              </td>
            </tr>
            :
            <tr key={page.id} onClick={() => handleRowClick(page.id)}>
              <td style={{ width: 450 }} align="right">
                {page.name}
              </td>
              <td style={{ width: 160 }} align="right">
                {page.links}
              </td>
            </tr>
          }
            
          )}

        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={pagesCant}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </Root>
  );
}

const grey = {
  200: '#d0d7de',
  800: '#32383f',
  900: '#24292f',
};

const Root = styled('div')(
  ({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  }
  `,
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;
import React from 'react';
import './bootstrap.min.css';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

class EmotionTable extends React.Component {
    render() {
      //Returns the emotions as an HTML table
      return (  
        <div>
          <Table className="table table-bordered" style={{width:"50%", marginLeft:"200px"}}>
            <TableBody>
            {
                Object.entries(this.props.emotions).map(function(mapentry) {
                        return (
                            <TableRow>
                            <TableCell style={{backgroundColor:"white"}}>{mapentry[0]}</TableCell>
                            <TableCell style={{backgroundColor:"white"}}>{mapentry[1]}</TableCell>
                            </TableRow>
                        )
                })
            }
            </TableBody>
          </Table>
          </div>
          );
        }
    
}
export default EmotionTable;
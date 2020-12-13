import Link from "next/link";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import axios from "axios";
import { mutate } from "swr";

import AddResources from "./AddResources";
import DeleteIcon from "@material-ui/icons/Delete";

export function Resources({ resources, isOwner, game }) {
  async function eraseResource(id) {
    await axios.post(`/api/resources/delete`, { _id: id, gameId: game });
    mutate(`/api/games/get?gameId=${game}`);
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Resource</TableCell>
            <TableCell>Link</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {resources.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.name}</TableCell>
              <TableCell style={{ color: "#512da8", fontWeight: 600 }}>
                <Link href={row.link}>{row.link}</Link>
              </TableCell>
              <TableCell>
                <Box display="flex" justifyContent="flex-end">
                  <DeleteIcon
                    onClick={() => eraseResource(row._id)}
                    style={{ cursor: "pointer" }}
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isOwner && <AddResources game={game} />}
    </>
  );
}

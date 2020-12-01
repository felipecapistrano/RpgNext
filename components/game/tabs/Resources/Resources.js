import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import AddResources from "./AddResources";

export function Resources({ resources, isOwner }) {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Resource</TableCell>
            <TableCell>Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resources.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell style={{ color: "#512da8", fontWeight: 600 }}>
                <Link href={row.link}>{row.link}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isOwner && <AddResources />}
    </>
  );
}

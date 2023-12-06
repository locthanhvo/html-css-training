import TableHeader from "@components/Table/TableHeader";
import TableRow from "@components/Table/TableRow";
import { CheckBox, User } from "@types";
import Text from "@components/common/Text";
import EmptyIcon from "@components/Icons/EmptyIcon";
import { Colors, FontSize } from "@themes";
import "./table.css";

interface Props {
  data: User[];
  onClickDelete: (id: string) => void;
  onClickEdit: (id: string) => void;
  onChangeCheckbox: ({ isChecked, checkboxId }: CheckBox) => void;
}

const Table = ({
  data,
  onClickDelete,
  onClickEdit,
  onChangeCheckbox,
}: Props) => {
  const renderTableContent = () =>
    data.map((value) => (
      <TableRow
        data={value}
        key={value.id}
        onClickDelete={onClickDelete}
        onClickEdit={onClickEdit}
        onChangeCheckbox={onChangeCheckbox}
      />
    ));

  return (
    <div className="table-content">
      <table className="table-user">
        <TableHeader />
        {data.length ? (
          <tbody>{renderTableContent()}</tbody>
        ) : (
          <tfoot>
            <tr>
              <td>
                <div className="table-empty d-flex flex-center">
                  <EmptyIcon />
                  <Text
                    content="No Data"
                    color={Colors.Black}
                    fontSize={FontSize.Medium}
                  />
                </div>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default Table;

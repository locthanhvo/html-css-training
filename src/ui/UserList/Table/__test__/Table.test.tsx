import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import Status from '@/components/Status';
import Table from '..';

// Icons
import {
  BinIcon,
  CheckboxIcon,
  LocationIcon,
  LockBoxIcon,
  PencilIcon,
  PersonIcon,
  PhoneIcon,
} from '@/icons';
import { DEFAULT_CURRENT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants';

const mockOnClick = jest.fn();

describe('Table Component', () => {
  const renderSetup = () =>
    render(
      <Table
        columns={[
          {
            title: 'Name',
            key: 'name',
            icon: <PersonIcon width={10} height={10} />,
            isSort: true,
          },
          {
            title: 'Phone',
            key: 'phone',
            icon: <PhoneIcon />,
            isSort: true,
          },
          {
            title: 'Location',
            key: 'location',
            icon: <LocationIcon />,
            isSort: true,
          },
          {
            title: 'Company',
            key: 'company',
            icon: <LockBoxIcon />,
            isSort: true,
          },
          {
            title: 'Status',
            key: 'status',
            icon: <CheckboxIcon />,
            isSort: true,
            renderBody: ({ status }) => (
              <Status type={status as 'online' | 'offline'} />
            ),
          },
          {
            title: '',
            key: 'action',
            renderBody: () => (
              <div className="flex gap-2">
                <button data-testid="edit-button" onClick={mockOnClick}>
                  <PencilIcon />
                </button>
                <button>
                  <BinIcon />
                </button>
              </div>
            ),
          },
        ]}
        dataSource={[
          {
            id: '1',
            name: 'John Doe',
            phone: '123-456-7890',
            location: 'New York, NY',
            company: 'ABC Company',
            status: 'online',
          },
          {
            id: '2',
            name: 'John Doe',
            phone: '123-456-7890',
            location: 'New York, NY',
            company: 'ABC Company',
            status: 'offline',
          },
          {
            id: '3',
            name: 'John Doe',
            phone: '123-456-7890',
            location: 'New York, NY',
            company: 'ABC Company',
            status: 'online',
          },
          {
            id: '4',
            name: 'John Doe',
            phone: '123-456-7890',
            location: 'New York, NY',
            company: 'ABC Company',
            status: 'offline',
          },
          {
            id: '5',
            name: 'John Doe',
            phone: '123-456-7890',
            location: 'New York, NY',
            company: 'ABC Company',
            status: 'offline',
          },
        ]}
        currentPage={DEFAULT_CURRENT_PAGE}
        pageSize={DEFAULT_PAGE_SIZE}
        total={100}
      />,
    );

  it('should render correctly', () => {
    const { container } = renderSetup();
    expect(container).toMatchSnapshot();
  });

  it('should render no data correctly', () => {
    const { getByText } = render(
      <Table
        columns={[
          {
            title: 'Name',
            key: 'name',
            icon: <PersonIcon width={10} height={10} />,
            isSort: true,
          },
          {
            title: 'Phone',
            key: 'phone',
            icon: <PhoneIcon />,
            isSort: true,
          },
          {
            title: 'Location',
            key: 'location',
            icon: <LocationIcon />,
            isSort: true,
          },
          {
            title: 'Company',
            key: 'company',
            icon: <LockBoxIcon />,
            isSort: true,
          },
          {
            title: 'Status',
            key: 'status',
            icon: <CheckboxIcon />,
            isSort: true,
            renderBody: ({ status }) => (
              <Status type={status as 'online' | 'offline'} />
            ),
          },
          {
            title: '',
            key: 'action',
            renderBody: () => (
              <div className="flex gap-2">
                <button>
                  <PencilIcon />
                </button>
                <button>
                  <BinIcon />
                </button>
              </div>
            ),
          },
        ]}
        dataSource={[]}
        currentPage={DEFAULT_CURRENT_PAGE}
        pageSize={DEFAULT_PAGE_SIZE}
        total={100}
      />,
    );
    expect(getByText('No data found')).toBeInTheDocument();
  });

  it('onClick edit button should be called', async () => {
    const { getAllByTestId } = renderSetup();
    await userEvent.click(getAllByTestId('edit-button')[0]);
    expect(mockOnClick).toHaveBeenCalled();
  });
});

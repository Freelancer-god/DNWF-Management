/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import {
  Breadcrumb, Button, Dropdown, Form, Modal,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { clog, tt } from '../../utils';
import {
  changeSpinnerCreate,
  changeRoleDescription,
  changeRoleName,
  create,
  deleteMulti,
  getItemByID,
  id,
  initDuplicate,
  update,
  updateItem,
  roleName,
  roleDescription,
  systemExpandedKeys,
  systemAutoExpandParent,
  systemCheckedKeys,
  systemSelectedKeys,
  driverExpandedKeys,
  driverAutoExpandParent,
  driverCheckedKeys,
  driverSelectedKeys,
  customerExpandedKeys,
  customerAutoExpandParent,
  customerCheckedKeys,
  customerSelectedKeys,
  vehiclesExpandedKeys,
  vehiclesAutoExpandParent,
  vehiclesCheckedKeys,
  vehiclesSelectedKeys,
  tripExpandedKeys,
  tripAutoExpandParent,
  tripCheckedKeys,
  tripSelectedKeys,
  notificationExpandedKeys,
  notificationCheckedKeys,
  notificationSelectedKeys,
  notificationAutoExpandParent,
  supportExpandedKeys,
  supportAutoExpandParent,
  supportCheckedKeys,
  supportSelectedKeys,
  changeSystemAutoExpandParent,
  changeSystemCheckedKeys,
  changeSystemExpandedKeys,
  changeSystemSelectedKeys,
  changeCustomerAutoExpandParent,
  changeCustomerCheckedKeys,
  changeCustomerExpandedKeys,
  changeCustomerSelectedKeys,
  changeDriverAutoExpandParent,
  changeDriverCheckedKeys,
  changeDriverExpandedKeys,
  changeDriverSelectedKeys,
  changeVehiclesAutoExpandParent,
  changeVehiclesCheckedKeys,
  changeVehiclesExpandedKeys,
  changeVehiclesSelectedKeys,
  changeTripAutoExpandParent,
  changeTripCheckedKeys,
  changeTripExpandedKeys,
  changeTripSelectedKeys,
  changeNotificationAutoExpandParent,
  changeNotificationCheckedKeys,
  changeNotificationExpandedKeys,
  changeNotificationSelectedKeys,
  changeSupportAutoExpandParent,
  changeSupportCheckedKeys,
  changeSupportExpandedKeys,
  changeSupportSelectedKeys,
} from '../../store/DriverManager';

import { getBreadcrumb } from '../../utils/function';
import { requireAdmin } from '../../store';
import { throttleOnPressAction } from '../../hook/throttlePressAcion';

const { confirm } = Modal;

function CustomForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const _updateItem = useSelector(updateItem);

  const _id = useSelector(id);
  const _roleName = useSelector(roleName);
  const _roleDescription = useSelector(roleDescription);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (type) => () => {
    throttleOnPressAction(submitSave);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    clog('searchParams id', searchParams.get('id'));
    const idParam = searchParams.get('id');
    if (idParam && _id === null) {
      dispatch(getItemByID({ id: idParam }));
    }
  }, []);

  const handleOnChildChange = (data) => {
    clog('dataToSend', data);
    const {
      _roleName,
      _roleDescription,

    } = data;
    dispatch(changeRoleName(_roleName));
    dispatch(changeRoleDescription(_roleDescription));

    // dispatch(changeRoleDescription(_roleDescription));
  };

  const dataToForm = () => ({
    _id,
    _roleName,
    _roleDescription,

    // _totalPrize,
    // _quantity,
    // _prize,
    // // _prizeUnder1,
    // // _prizeBetween1,
    // _commissionType,
    // _commission,
    // _commissionSaleType,
    // _commissionSale,
    // _rangeDate,
    // _prizeStores,
    // _isRange,
    // _rangeDay,
    // _rangeTime,
    // _cover,
  });

  const submitSave = () => {
    if (_id) {
      // update
      dispatch(update()).then(({ payload }) => {
        if (payload) {
          navigate('/cms/drivers?view_type=list');
        }
      });
    } else {
      // new
      dispatch(create()).then(({ payload }) => {
        if (payload) {
          navigate('/cms/drivers?view_type=list');
        }
      });
    }
  };

  const handleOnPressSave = () => {
    clog('Cập nhật');
    throttleOnPressAction(submitSave);
  };

  const handleOnPressCancel = () => {
    navigate('/cms/drivers?view_type=list');
  };

  const handleOnPressCreate = () => {
    showModal();
  };

  const items = [
    {
      label: tt('Nhân bản'),
      key: '0',
    },
    // can("championshipvouchers", ["championshipvouchers-voucher-delete"], _permission) && {
    //     label: tt("Xoá"),
    //     key: "1",
    //     //   disabled: _updateItem?.status !== 1,
    // },
  ];

  const submitDelete = () => {
    requireAdmin().then(() => {
      dispatch(changeSpinnerCreate(true));
      dispatch(deleteMulti({ selectedRows: [_updateItem] })).then(
        ({ payload }) => {
          dispatch(changeSpinnerCreate(false));
          if (payload) {
            navigate('/cms/drivers?view_type=list');
          }
        },
      );
    });
  };

  const handleMenuClick = (e) => {
    switch (e.key) {
      case '0':
        dispatch(initDuplicate());
        navigate('/cms/drivers?view_type=form');
        break;
      case '1':
        confirm({
          title: tt('Bạn có chắc chắn muốn xoá?'),
          icon: <ExclamationCircleFilled />,
          content: `${tt('Xoá')} ${_updateItem?.display_name}`,
          onOk() {
            throttleOnPressAction(submitDelete);
          },
          onCancel() {},
        });
        break;
      default:
        break;
    }
  };

  const breadcrumbNameMap = {
    '?view_type=list': tt('Danh sách vai trò'),
    '?view_type=form': tt('Mới'),
    '?view_type=form&id={id}': _updateItem?.display_name,
  };
  const extraBreadcrumbItems = getBreadcrumb(breadcrumbNameMap);
  const breadcrumbItems = [
    {
      title: <Link to="/cms/drivers">{tt('Danh sách Vai trò')}</Link>,
      key: 'role_home',
    },
  ].concat(extraBreadcrumbItems);

  const setTypeConfirm = () => (searchParams.get('id') === null ? 'create' : 'update');

  return (
    <div
      className="custom-container"
      style={{ paddingTop: '10px', paddingBottom: 0 }}
    >
      <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
        <div style={{ height: '32px' }} className="mb-1.5">
          <div className="ant-breadcrumb_custom_fontsize">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Button
              type="primary"
              style={{ marginRight: '8px' }}
              className="mb-1.5"
              onClick={handleOnPressSave}
            >
              {tt(_id ? 'Cập nhật' : 'Lưu')}
            </Button>

            <Button
              style={{ marginRight: '8px' }}
              className="mb-1.5"
              onClick={handleOnPressCancel}
            >
              {tt('Huỷ bỏ')}
            </Button>
            {/* {_id && ( */}
            {/*	<Can appName={'championshipvouchers'} p={['championshipvouchers-voucher-create']}> */}
            {/*		<Button */}
            {/*			style={{ marginRight: '8px' }} */}
            {/*			className="mb-1.5" */}
            {/*			onClick={handleOnPressCreate} */}
            {/*		> */}
            {/*			{tt('Tạo')} */}
            {/*		</Button> */}
            {/*	</Can> */}
            {/* )} */}
          </div>
          {_id && (
            <div>
              {/* <Dropdown
                menu={{
                  items,
                  onClick: handleMenuClick,
                }}
                trigger={['click']}
              >
                <Button
                  icon={<i className="fa fa-cog" />}
                  onClick={(e) => e.preventDefault()}
                  className="custom-button-ant-span bp375:float-right mb-1.5"
                >
                  {tt('Tác vụ')}
                </Button>
              </Dropdown> */}
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="bg-stripes-purple">
          <div
            className="custom-form-sheet-sm"
            style={{ maxWidth: '1000px', minHeight: 'unset' }}
          >
            <Create
              data={dataToForm()}
              onChangeData={handleOnChildChange}
            />
          </div>
        </div>
      </div>

      {/* <ModalInforPrize
                data={dataToForm()}
                isModalOpen={isModalOpen}
                handleOk={handleOk(setTypeConfirm())}
                handleCancel={handleCancel}
            /> */}
    </div>
  );
}

export default CustomForm;

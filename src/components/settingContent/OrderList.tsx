import MyOrderList from './MyOrderList';

function OrderList() {
  return (
    <div className="">
      <div className="text-[25px] border-b border-gray text-[#373737] p-[10px]">주문 내역</div>
      <div className="my-[30px]">
        <MyOrderList />
      </div>

      <div className="h-[50px]" />
    </div>
  );
}

export default OrderList;

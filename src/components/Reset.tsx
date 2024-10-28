function Reset() {
  const handleClick = () => {
    const result = window.confirm('정말로 삭제하시겠습니까?');
    if (result) {
      alert('투자 기록을 초기화하였습니다.');
    }
  };
  return (
    <div className="flex flex-col justify-between w-[60%] ">
      <div className="flex justify-center items-ceter text-font-gray ">
        투자 기록을 초기화 하면 사용자의 모든 투자 기록과 자산 정보가 초기의 상태로 돌아갑니다. 데이터가 영구 삭제
        되므로 기록을 다시 복구할 수 없습니다. 신중하게 고민 후 결정 하시길 바랍니다.
      </div>
      <button className="w-[80px] text-[#ff0000] my-[20px] text-start " onClick={handleClick}>초기화하기</button>
    </div>
  );
}

export default Reset;

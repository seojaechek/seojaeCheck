let scrollPosition = 0;

const useScrollLock = {
  enable(): void {
    // 현재 스크롤 위치 저장
    scrollPosition = window.scrollY;

    // body 스타일 설정
    document.body.style.cssText = `
      position: fixed; 
      top: -${scrollPosition}px;
      overflow-y: scroll;
      width: 100%;`;
  },
  disable(): void {
    // 저장된 스크롤 위치 가져오기
    const scrollY = parseInt(document.body.style.top || "0", 10) * -1;

    // body 스타일 초기화
    document.body.style.cssText = "";

    // 저장된 스크롤 위치로 복원
    window.scrollTo(0, scrollY);
  },
};

export default useScrollLock;

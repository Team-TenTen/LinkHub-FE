// 컴포넌트 테스트 코드입니다
import { Button } from '@/components'

const TestPage = () => {
  return (
    <>
      <div>
        <Button className="button button-md button-white">흰색 버튼</Button>
      </div>
      <div>
        <Button className="button button-md button-emerald">초록 버튼</Button>
      </div>
      <div>
        <Button className="button button-md button-gray">회색 버튼</Button>
      </div>
    </>
  )
}

export default TestPage

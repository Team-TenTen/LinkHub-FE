// 컴포넌트 테스트 코드입니다
import { Button } from '@/components'

const TestPage = () => {
  return (
    <>
      <div>
        <Button
          className="
            rounded-md
            border
            border-slate-600 
            px-4
            py-2.5
            font-['Pretendard']
            text-sm
            font-bold
            leading-tight
            text-slate-600
          ">
          흰색 버튼
        </Button>
      </div>
      <div>
        <Button
          className="
            rounded-md
            border
            border-emerald-600 
            bg-emerald-500
            px-4
            py-2.5
            font-['Pretendard']
            text-sm
            font-bold
            leading-tight
            text-white
          ">
          초록 버튼
        </Button>
      </div>
    </>
  )
}

export default TestPage

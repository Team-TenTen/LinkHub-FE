// 컴포넌트 테스트 코드입니다
import Button from '@/components/common/Button/Button'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/outline'
import { PlusSmallIcon } from '@heroicons/react/24/solid'

const TestPage = () => {
  return (
    <>
      <div className="m-1">
        <Button className="button button-md button-white">흰색 버튼</Button>
      </div>
      <div className="m-1">
        <Button className="button button-md button-emerald">초록 버튼</Button>
      </div>
      <div className="m-1">
        <Button className="button button-md button-gray">회색 버튼</Button>
      </div>
      <div className="m-1">
        <Button className="button button-md button-lg button-white">
          흰색 큰 버튼
        </Button>
      </div>
      <div className="m-1">
        <Button className="button button-md button-lg button-emerald">
          초록 큰 버튼
        </Button>
      </div>
      <div className="m-1">
        <Button className="button button-md button-lg button-gray">
          회색 큰 버튼
        </Button>
      </div>
      <div className="m-1">
        <Button className="button button-sm button-emerald">
          <PlusSmallIcon className="h-5 w-5" />
        </Button>
      </div>
      <div className="m-1">
        <Button className="button button-sm button-gray">
          <PlusSmallIcon className="h-5 w-5" />
        </Button>
      </div>
      <div className="m-1">
        <Button className="button button-sm button-white">
          <PencilSquareIcon className="h-5 w-5" />
        </Button>
      </div>
      <div className="m-1">
        <Button className="button button-round button-white">Button</Button>
      </div>
      <div className="m-1">
        <Button className="button button-round button-white">
          <HeartIcon className="h-4 w-4" />
          Button
        </Button>
      </div>
    </>
  )
}

export default TestPage

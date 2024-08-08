// 'use client'
import { Suspense } from 'react'
import FloatingButton from '@/components/FloatingButton/FloatingButton'
import CategoryListController from '../CategoryList/CategoryListController'
import DeferredComponent from '../DeferedComponent/DeferedComponent'
import DropdownController from '../Dropdown/DropdownController'
import Spinner from '../Spinner/Spinner'
import SpaceListController from './SpaceListController'

const MainSpaceController = () => {
  return (
    <>
      <section>
        <div className="sticky top-[53px] z-40 bg-bgColor">
          <div className="flex items-center justify-between px-4 pt-2">
            <h2 className="font-bold text-gray9">스페이스 모음</h2>
            <Suspense
              fallback={
                <DeferredComponent>
                  <Spinner />
                </DeferredComponent>
              }>
              <DropdownController />
            </Suspense>
          </div>
          <Suspense
            fallback={
              <DeferredComponent>
                <Spinner />
              </DeferredComponent>
            }>
            <CategoryListController />
          </Suspense>
        </div>
        <Suspense
          fallback={
            <DeferredComponent>
              <Spinner />
            </DeferredComponent>
          }>
          <SpaceListController />
        </Suspense>
      </section>
      <FloatingButton />
    </>
  )
}

export default MainSpaceController

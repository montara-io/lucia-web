import React, { FunctionComponent } from 'react'
import './Loading.scss'
import { ProgressBar } from 'primereact/progressbar'
import { IntlProvider } from 'react-intl'
import lang from '../lang/en.json'
import classNames from 'classnames'

export type LoadingProps = {
  id: string
  mode: 'dark' | 'light'
  className?: string
}
const locale = navigator.language

const Loading: FunctionComponent<LoadingProps> = ({ mode, id, className }) => {
  return (
    <div
      id={id}
      data-testid="m-loading"
      className={classNames(
        `m-loading-${mode === 'dark' ? 'dark' : 'light'}`,
        className,
      )}
    >
      <ProgressBar mode="indeterminate" />
    </div>
  )
}
const WrappedLoading = (props) => {
  return (
    <IntlProvider locale={locale} messages={lang}>
      <Loading {...props} />
    </IntlProvider>
  )
}
export default WrappedLoading

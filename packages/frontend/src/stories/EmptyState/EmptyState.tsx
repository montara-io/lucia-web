import React from 'react'
import './EmptyState.scss'

import classNames from 'classnames'

const NO_DATA_MESSAGE = 'No data to show'

interface EmptyStateProps {
  className?: string
}

const EmptyState: React.FunctionComponent<EmptyStateProps> = ({
  className,
}) => {
  return (
    <div className={classNames('no-data-container', className)}>
      <img
        alt={NO_DATA_MESSAGE}
        className="no-data-icon"
        src="/assets/no-data.png"
      />
      <span className="caption">{NO_DATA_MESSAGE}</span>
    </div>
  )
}

export default EmptyState

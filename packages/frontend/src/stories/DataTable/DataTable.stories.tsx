import React from 'react'
import Card from '../Card/Card'

import Tile from '../Tile'
import { getSeverityByValue } from '../utils'
import { DEFAULT_AVATAR_IMG } from '../utils/consts'
import DataTable from './DataTable'

export default {
  title: 'Components/DataTable',
  component: DataTable,
}

export const Primary = (args) => <DataTable {...args} />

Primary.args = {
  id: 'id',
  bodyData: [
    {
      name: 'Retention Issue',
      teamName: 'Cristiano Gates',
      issuesubject: 'Cristiano Gates',
      metric: 'Retention',
      severity: 'Low',
      duration: '5 Days',
      state: 'Open',
      date: '8/2/2021',
      isActive: true,
    },
    {
      name: 'Engagement Issue',
      teamName: 'My Team',
      issuesubject: 'Nicola Gates',
      metric: 'Wellbeing',
      severity: 'High',
      duration: '22 Days',
      state: 'Closed',
      date: '8/15/2021',
      isActive: false,
    },
    {
      name: 'My Issue',
      teamName: 'My Team',
      issuesubject: 'John Levi',
      metric: 'Metric',
      severity: 'Medium',
      duration: '0 Days',
      state: 'Open',
      date: '1/1/2021',
      isActive: false,
    },
    {
      name: 'My Issue',
      teamName: 'My Team',
      issuesubject: 'John Levi',
      metric: 'Metric',
      severity: 'Medium',
      duration: '0 Days',
      state: 'Open',
      date: '1/1/2021',
      isActive: false,
    },
    {
      name: 'My Issue',
      teamName: 'My Team',
      issuesubject: 'John Levi',
      metric: 'Metric',
      severity: 'Medium',
      duration: '0 Days',
      state: 'Open',
      date: '1/2/2021',
      isActive: false,
    },
  ],
  headerData: [
    {
      field: 'name',
      title: '',
      sortType: 'string',
      placeholder: 'Search by name',
      sortable: false,
      formatter: (data: any) => (
        <div>
          <div
            className="m-fname"
            style={{ fontSize: '16px', fontWeight: 600 }}
          >
            {data.name}
          </div>
          <div className="m-tname">{data.teamName}</div>
        </div>
      ),
    },
    {
      field: 'issuesubject',
      title: 'ISSUE SUBJECT',
      sortType: 'dropdown',
      placeholder: 'Search by name',
      sortable: true,
      filter: true,
      formatter: (data: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <img
              style={{
                height: '30px',
                borderRadius: '50%',
                marginRight: '17px',
              }}
              src="./assets/avatars/11.png"
              alt="icon"
            />
          </div>
          <p className="m-span">{data.issuesubject}</p>
        </div>
      ),
    },
    {
      field: 'metric',
      title: 'METRIC',
      sortType: 'dropdown',
      sortable: true,
    },
    {
      field: 'severity',
      title: 'SEVERITY',
      sortType: 'dropdown',
      sortable: true,
    },
    {
      field: 'date',
      title: 'START DATE',
      sortType: 'date',
      placeholder: 'Select date',
      sortable: true,
    },
    {
      field: 'duration',
      title: 'DURATION',
      sortType: 'string',
      placeholder: 'Select',
      sortable: true,
    },
    {
      field: 'state',
      title: 'STATE',
      sortType: 'dropdown',
      sortable: true,
    },
  ],
  showExporting: true,
  paginationRows: 4,
  onFilter: (e) => {
    console.log(e)
  },
  onSort: (e) => {
    console.log(e)
  },
  scrollHeight: '800px',
}

export const IssuesTable = (args) => <DataTable {...args} />

IssuesTable.args = {
  id: 'id',
  bodyData: [
    {
      name: 'Retention Issue',
      teamName: 'Cristiano Gates',
      issuesubject: 'Cristiano Gates',
      metric: 'Retention',
      severity: 'Low',
      duration: '5 Days',
      state: 'Open',
      date: '8/2/2021',
      isActive: true,
    },
    {
      name: 'Engagement Issue',
      teamName: 'My Team',
      issuesubject: 'Nicola Gates',
      metric: 'Wellbeing',
      severity: 'High',
      duration: '22 Days',
      state: 'Closed',
      date: '8/15/2021',
      isActive: false,
    },
    {
      name: 'My Issue',
      teamName: 'My Team',
      issuesubject: 'John Levi',
      metric: 'Metric',
      severity: 'Medium',
      duration: '0 Days',
      state: 'Open',
      date: '1/1/2021',
      isActive: false,
    },
    {
      name: 'My Issue',
      teamName: 'My Team',
      issuesubject: 'John Levi',
      metric: 'Metric',
      severity: 'Medium',
      duration: '0 Days',
      state: 'Open',
      date: '1/1/2021',
      isActive: false,
    },
    {
      name: 'My Issue',
      teamName: 'My Team',
      issuesubject: 'John Levi',
      metric: 'Metric',
      severity: 'Medium',
      duration: '0 Days',
      state: 'Open',
      date: '1/2/2021',
      isActive: false,
    },
  ],
  headerData: [
    {
      field: 'name',
      title: '',
      sortType: 'string',
      placeholder: 'Search by name',
      sortable: false,
      formatter: (data: any) => (
        <div>
          <div
            className="m-fname"
            style={{ fontSize: '16px', fontWeight: 600 }}
          >
            {data.name}
          </div>
          <div className="m-tname">{data.teamName}</div>
        </div>
      ),
    },
    {
      field: 'issuesubject',
      title: 'ISSUE SUBJECT',
      sortType: 'string',
      placeholder: 'Search by name',
      sortable: true,
      formatter: (data: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <img
              style={{
                height: '30px',
                borderRadius: '50%',
                marginRight: '17px',
              }}
              src="./assets/avatars/11.png"
              alt="icon"
            />
          </div>
          <p className="m-span">{data.issuesubject}</p>
        </div>
      ),
    },
    {
      field: 'metric',
      title: 'METRIC',
      sortType: 'dropdown',
      sortable: true,
    },
    {
      field: 'severity',
      title: 'SEVERITY',
      sortType: 'dropdown',
      sortable: true,
    },
    {
      field: 'date',
      title: 'START DATE',
      sortType: 'date',
      placeholder: 'Select date',
      sortable: true,
    },
    {
      field: 'duration',
      title: 'DURATION',
      sortType: 'string',
      placeholder: 'Select',
      sortable: true,
    },
    {
      field: 'state',
      title: 'STATE',
      sortType: 'dropdown',
      sortable: true,
    },
  ],
  scrollHeight: '800px',
}

const severity = {
  display: 'block',
  borderRadius: '50px',
  width: '1.6em',
  marginLeft: 'auto',
  marginRight: 'auto',
  borderWidth: '0.15em',
  borderStyle: 'solid',
  background: '#FFC965',
  borderColor: '#FFC965',
}

export const GroupsTable = (args) => (
  <Card>
    <DataTable {...args} />
  </Card>
)

GroupsTable.args = {
  id: 'id',
  onValueChange: (filteredData) => console.log(filteredData),
  bodyData: [
    {
      name: { group: 'R&D Group', manager: 'Jane Austin (547 Employees)' },
      avatarURI: '',
      engagement: 96,
      retention: 1,
      wellbeing: 50,
      subtreeSize: 547,
    },
    {
      name: { group: 'R&D Group', manager: 'Jane Austin (547 Employees)' },
      avatarURI: '',
      engagement: 96,
      retention: 1,
      wellbeing: 50,
      subtreeSize: 547,
    },
    {
      name: { group: 'R&D Group', manager: 'Jane Austin (547 Employees)' },
      avatarURI: '',
      engagement: 96,
      retention: 1,
      wellbeing: 50,
      subtreeSize: 547,
    },
    {
      name: { group: 'R&D Group', manager: 'Jane Austin (547 Employees)' },
      avatarURI: '',
      engagement: 96,
      retention: 1,
      wellbeing: 50,
      subtreeSize: 547,
    },
    {
      name: { group: 'R&D Group', manager: 'Jane Austin (547 Employees)' },
      avatarURI: '',
      engagement: 96,
      retention: 1,
      wellbeing: 50,
      subtreeSize: 547,
    },
    {
      name: {
        group: 'Design Group',
        manager: 'Maegan White (187 Employees)',
      },
      engagement: 4,
      retention: 11,
      wellbeing: 50,
      subtreeSize: 187,
    },
    {
      name: { group: 'Ops Group', manager: 'Isaac Lambert (117 Employees)' },
      engagement: 56,
      retention: 88,
      wellbeing: 50,
      subtreeSize: 117,
    },
    {
      name: {
        group: 'Engineering Group',
        manager: 'Tasmin Simpson (89 Employees)',
      },
      engagement: 37,
      retention: 7,
      wellbeing: 50,
      subtreeSize: 89,
    },
    {
      name: {
        group: 'Architecture Group',
        manager: 'Stewart Hunter (85 Employees)',
      },
      engagement: 70,
      retention: 77,
      wellbeing: 50,
      subtreeSize: 85,
    },
    {
      name: { group: 'Analytics Group', manager: 'Lily Corel (45 Employees)' },
      engagement: 99,
      retention: null,
      wellbeing: 50,
      subtreeSize: 45,
    },
    {
      name: { group: 'Security Group', manager: 'Fabio Zuniga (24 Employees)' },
      engagement: 33,
      retention: 80,
      wellbeing: 50,
      subtreeSize: 24,
    },
  ],
  headerData: [
    {
      field: 'subtreeSize',
      title: '',
      sortType: 'string',
      placeholder: 'Search',
      sortable: true,
      sortField: 'subtreeSize',
      filter: true,
      headerStyle: { maxWidth: '25em', width: '20em', minWidth: '16em' },
      filterFunction: (value, filter) => {
        return (
          (value?.length > 1 &&
            value?.group?.toLowerCase()?.indexOf(filter?.toLowerCase()) > -1) ||
          value?.manager?.toLowerCase()?.indexOf(filter?.toLowerCase()) > -1
        )
      },
      template: (data: any) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            maxWidth: '25em',
            minWidth: '18em',
          }}
        >
          <div>
            <img
              style={{
                height: '30px',
                borderRadius: '50%',
                marginRight: '17px',
              }}
              src={data.avatarURI || DEFAULT_AVATAR_IMG}
              alt="icon"
              onError={(e) => (e.target['src'] = DEFAULT_AVATAR_IMG)}
            />
          </div>
          <div>
            <div
              style={{
                fontWeight: 600,
                fontSize: '16px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '21em',
              }}
            >
              {data.name.group}
            </div>
            <div
              style={{
                fontSize: '14px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {data.name.manager}
            </div>
          </div>
        </div>
      ),
    },
    {
      field: 'engagement',
      title: 'engagement',
      sortType: 'number',
      sortable: true,
      template: (data: any) => (
        <Tile>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            {data.engagement || '-'}
            <span
              style={severity}
              className={`severity-indicator-line severity-indicator-line-${getSeverityByValue(
                data.engagement,
              )}`}
            />
          </div>
        </Tile>
      ),
    },
    {
      field: 'retention',
      title: 'retention',
      sortType: 'number',
      sortable: true,
      template: (data: any) => (
        <Tile>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            {data.retention || '-'}
            <span
              style={severity}
              className={`severity-indicator-line severity-indicator-line-${getSeverityByValue(
                data.retention,
              )}`}
            />
          </div>
        </Tile>
      ),
    },
    {
      field: 'wellbeing',
      title: 'wellbeing',
      sortType: 'number',
      sortable: true,
      template: (data: any) => (
        <Tile>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            {data.retention || '-'}
            <span
              style={severity}
              className={`severity-indicator-line severity-indicator-line-${getSeverityByValue(
                data.retention,
              )}`}
            />
          </div>
        </Tile>
      ),
    },
    {
      field: 'org.health',
      title: 'org health',
      sortType: 'number',
      sortable: true,
      disabled: true,
      template: (data: any) => <div />,
    },
    {
      field: 'dei',
      title: 'dei',
      sortType: 'number',
      sortable: true,
      disabled: true,
      template: (data: any) => <div />,
    },
    {
      field: 'leadership',
      title: 'leadership',
      sortType: 'number',
      sortable: true,
      disabled: true,
      template: (data: any) => <div />,
    },
    {
      field: 'productivity',
      title: 'productivity',
      sortType: 'number',
      sortable: true,
      disabled: true,
      template: (data: any) => <div />,
    },
  ],
  defaultSortField: 'subtreeSize',
  paginationRows: 10,
  removeSeparators: true,
  scrollHeight: '600px',
  onSort: (e) => {
    console.log(e)
  },
}

export const EmptyTable = (args) => (
  <div style={{ height: '800px', maxHeight: '800px' }}>
    <DataTable {...args} />
  </div>
)

EmptyTable.args = {
  id: 'id',
  bodyData: [],
  headerData: [
    {
      field: 'name',
      title: '',
      sortType: 'string',
      placeholder: 'Search',
      sortable: true,
      filter: true,
      filterFunction: (value, filter) => {
        return (
          value?.group?.toLowerCase()?.indexOf(filter?.toLowerCase()) > -1 ||
          value?.manager?.toLowerCase()?.indexOf(filter?.toLowerCase()) > -1
        )
      },
      template: (data: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <img
              style={{
                height: '30px',
                borderRadius: '50%',
                marginRight: '17px',
              }}
              src={data.avatarURI || DEFAULT_AVATAR_IMG}
              alt="icon"
              onError={(e) => (e.target['src'] = DEFAULT_AVATAR_IMG)}
            />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '16px' }}>
              {data.name.group}
            </div>
            <div style={{ fontSize: '14px' }}>{data.name.manager}</div>
          </div>
        </div>
      ),
    },
    {
      field: 'engagement',
      title: 'engagement',
      sortType: 'number',
      sortable: true,
      template: (data: any) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {data.engagement || '-'}
          <span
            className={`severity-indicator-line severity-indicator-line-${getSeverityByValue(
              data.engagement,
            )}`}
          />
        </div>
      ),
    },
    {
      field: 'retention',
      title: 'retention',
      sortType: 'number',
      sortable: true,
      template: (data: any) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {data.retention || '-'}
          <span
            className={`severity-indicator-line severity-indicator-line-${getSeverityByValue(
              data.retention,
            )}`}
          />
        </div>
      ),
    },
    {
      field: 'wellbeing',
      title: 'wellbeing',
      sortType: 'number',
      sortable: true,
      template: (data: any) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {data.wellbeing || '-'}
          <span
            className={`severity-indicator-line severity-indicator-line-${getSeverityByValue(
              data.wellbeing,
            )}`}
          />
        </div>
      ),
    },
    {
      field: 'org.health',
      title: 'org health',
      sortType: 'number',
      sortable: true,
      disabled: true,
      template: (data: any) => <div />,
    },
    {
      field: 'dei',
      title: 'dei',
      sortType: 'number',
      sortable: true,
      disabled: true,
      template: (data: any) => <div />,
    },
  ],
  paginationRows: 6,
}

Primary.parameters = {
  jest: ['DataTable.test.tsx'],
}

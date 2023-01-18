import { PulseFFValues } from './Types';

export enum FeatureFlags {
  FOCUS_ON_WELLBEING = 'webapp-fe_focus-on-wellbeing_release-manager',
  HELP_LINK = 'webapp-fe_help-link-button_release-manager',
  INTERNAL_AD_LEARN = 'webapp-fe_internal-ad-learn_release-manager',
  FOCUS_ON_TEAM = 'webapp-fe_focus-on-teams_release-manager',
  EXECUTIVE_BY_LOCATION = 'webapp-fe_executive-by-location_release-manager',
  HR_EXECUTIVE_BY_LOCATION = 'webapp-fe_hr-executive-by-location_release-manager',
  EXECUTIVE_DEI_TRACKER = 'webapp-fe_executive-dei-tracker_release-manager',
  HR_EXECUTIVE_DEI_TRACKER = 'webapp-fe_hr-executive-dei-tracker_release-manager',
  EXECUTIVE_DEI_METRIC_MODAL = 'webapp-fe_executive-dei-metric-modal_release-manager',
  TRIGGER_EVENTS_BY_URL = 'webapp-fe_trigger-events-by-url_release-manager',
  SPOTLIGHTS_FOR_EXECUTIVES = 'webapp-fe_spotlights-for-executives_release-manager',
  INSIGHTS_SECTIONS = 'webapp-fe_insights-sections_release-manager',
  DRIVER_METRIC_INSIGHTS = 'webapp-fe_driver-metric-insights_release-manager',
  METRIC_ANOMALY_INSIGHTS_SECTION = 'webapp-fe_metric-anomaly-insights-section_release-manager',
  LEADERSHIP_METRIC_DRIVERS = 'webapp-fe_leadership-metric-drivers_release-manager',
  DYNAMIC_ZOOM = 'webapp-fe_dynamic-zoom_release-manager',
  EXECUTIVE_DASHBOARD_TILES = 'webapp-fe_executive-dashboard-tiles_release-manager',
  FOCUS_BUTTON = 'webapp-fe_focus-button_release-manager',
  MANGER_EMPLOYEE_DATA = 'webapp-fe_manger-employee-data_provisioning',
  DEI_EXECUTIVES_TEASER = 'webapp-fe_executives-dei-teaser_provisioning',
  ACTION_PLAN_MODAL = 'webapp-fe_action-plan-modal_release-manager',
  EXECUTIVES_TRAKER_SPOTLIGHTS = 'webapp-fe_executives-tracker-spotlights_release-manager',
  MY_MANAGERS_PAGE = 'webapp-fe_my-managers-page_release-manager',
  MY_LEADERSHIP_PAGE = 'webapp-fe_my-leadership-page_release-manager',
  PULSE_FEEDBACK = 'webapp-fe_pulse-feedback_provisioning',
  SEND_PULSE_IMMEDIATELY = 'webapp-fe_pulse-send-immediately',
  PULSE_SENTIMENT = 'webapp-fe_pulse-sentiment_provisioning',
  PULSE_MULTI_SELECT = 'webapp-fe_multi-select_release-manager',
}

export const StringFeatureFlags: string[] = [FeatureFlags.PULSE_FEEDBACK];
export const StringFeatureFlagsDefaultValues: { [key: string]: string[] } = {
  [FeatureFlags.PULSE_FEEDBACK]: [
    PulseFFValues.SHOW_MENU_WITHOUT_PULSES,
    PulseFFValues.SHOW_MENU_WITH_PULSES,
    PulseFFValues.SHOW_ONLY_PULSES,
  ],
};

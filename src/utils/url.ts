export const isValidUrl = (url = '') => {
  try {
    const ourl = new URL(url)
    return ourl !== null && ourl.protocol.startsWith('http')
  } catch (err) {
    return false
  }
}

const blacklistKeys = [
  'CNDID',
  '__twitter_impression',
  '_hsenc',
  '_openstat',
  'action_object_map',
  'action_ref_map',
  'action_type_map',
  'amp',
  'fb_action_ids',
  'fb_action_types',
  'fb_ref',
  'fb_source',
  'fbclid',
  'ga_campaign',
  'ga_content',
  'ga_medium',
  'ga_place',
  'ga_source',
  'ga_term',
  'gs_l',
  'hmb_campaign',
  'hmb_medium',
  'hmb_source',
  'mbid',
  'mc_cid',
  'mc_eid',
  'mkt_tok',
  'referrer',
  'share_source',
  'share_tag',
  'share_session_id',
  'share_plat',
  'share_from',
  'share_medium',
  'spJobID',
  'spMailingID',
  'spReportId',
  'spUserID',
  'utm_brand',
  'utm_campaign',
  'utm_cid',
  'utm_content',
  'utm_int',
  'utm_mailing',
  'utm_medium',
  'utm_name',
  'utm_place',
  'utm_pubreferrer',
  'utm_reader',
  'utm_social',
  'utm_source',
  'utm_swu',
  'utm_term',
  'utm_userid',
  'utm_viz_id',
  'wt_mc_o',
  'yclid',
  'WT.mc_id',
  'WT.mc_ev',
  'WT.srch',
  'pk_source',
  'pk_medium',
  'pk_campaign',
]

/**
 * remove tracking/utm params from url
 * @todo purify url based on domain
 */
export const purify = (url: any) => {
  try {
    const pureUrl = new URL(url)

    blacklistKeys.forEach(key => {
      pureUrl.searchParams.delete(key)
    })

    return pureUrl.toString().replace(pureUrl.hash, '')
  } catch (err) {
    return null
  }
}


export const getDomain = (url: string) => {
  const host = (new URL(url)).host
  return host.replace('www.', '')
}
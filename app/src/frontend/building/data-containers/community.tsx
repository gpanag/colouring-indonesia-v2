import './community.css';
import '../../map/map-button.css';
import React, { Fragment } from 'react';
import withCopyEdit from '../data-container';
import UserOpinionEntry from '../data-components/user-opinion-data-entry';
import { MultiSelectDataEntry } from '../data-components/multi-select-data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';
import { CategoryViewProps } from './category-view-props';
import { LogicalDataEntry, LogicalDataEntryYesOnlyWithExplanation } from '../data-components/logical-data-entry/logical-data-entry';
import { buildingUserFields, dataFields } from '../../config/data-fields-config';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';

/**
* Community view/edit section
*/
const CommunityView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const switchToLikesMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('typology_likes')
    }
    const switchToLocalSignificanceMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('community_local_significance_total')
    }
   const switchToExpectedApplicationMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('community_expected_planning_application_total')
    }
    const switchToPublicOwnershipMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('community_in_public_ownership')
    }
    
    const worthKeepingReasonsNonEmpty = Object.values(props.building.community_type_worth_keeping_reasons ?? {}).some(x => x);

    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    return (
        <Fragment>
            <DataEntryGroup name="Community views on how well buildings work" collapsed={subcat==null || subcat!="1"}>
            <div className={`alert alert-dark`} role="alert" style={{ fontSize: 13, backgroundColor: "#f6f8f9" }}>
                <i>
                    Note: We are currently only collecting data on non-residential buildings.
                </i>
            </div>
            <div className='community-opinion-pane'>
                {(props.building.is_domestic === "no" || props.building.is_domestic === "mixed domestic/non-domestic") ?
                <>
                    <UserOpinionEntry
                        slug='community_like'
                        title={buildingUserFields.community_like.title}

                        userValue={props.building.community_like}

                        onChange={props.onSaveChange}
                        mode={props.mode}
                    />
                    </>
                : 
                    <></>
                }
                <LogicalDataEntryYesOnlyWithExplanation
                    slug='community_type_worth_keeping'
                    title={buildingUserFields.community_type_worth_keeping.title}

                    value={props.building.community_type_worth_keeping}
                    disallowFalse={worthKeepingReasonsNonEmpty}
                    disallowNull={worthKeepingReasonsNonEmpty}

                    onChange={props.onSaveChange}
                    mode={props.mode}

                />
                {(props.mapColourScale != "typology_likes") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToLikesMapStyle}>
                        {'Click to show liked typologies.'}
                    </button>
                    :
                    <></>
                }
                {
                    props.building.community_type_worth_keeping === true &&
                    <MultiSelectDataEntry
                        slug='community_type_worth_keeping_reasons'
                        title={buildingUserFields.community_type_worth_keeping_reasons.title}
                        value={props.building.community_type_worth_keeping_reasons}
                        disabled={!props.building.community_type_worth_keeping}
                        onChange={props.onSaveChange}
                        options={
                            Object.entries(buildingUserFields.community_type_worth_keeping_reasons.fields)
                            .map(([key, definition]) => ({
                                key,
                                label: definition.title
                            }))
                        }
                        
                        mode={props.mode}
                    />
                }
                <hr />
                <UserOpinionEntry
                    slug='community_local_significance'
                    title={buildingUserFields.community_local_significance.title}
                    
                    userValue={props.building.community_local_significance}

                    onChange={props.onSaveChange}
                    mode={props.mode}
                />
                {(props.mapColourScale != "community_local_significance_total") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToLocalSignificanceMapStyle}>
                        {'Click to show buildings of local interest.'}
                    </button>
                    :
                    <></>
                }
                <hr />
                <UserOpinionEntry
                    slug='community_expected_planning_application'
                    title={buildingUserFields.community_expected_planning_application.title}
                    
                    userValue={props.building.community_expected_planning_application}

                    onChange={props.onSaveChange}
                    mode={props.mode}
                />
                <div className={`alert alert-dark`} role="alert" style={{ fontSize: 13, backgroundColor: "#f6f8f9" }}>
                    <i>
                        For more information on current planning applications, refer to the Planning Controls category.
                    </i>
                </div>
                {(props.mapColourScale != "community_expected_planning_application_total") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToExpectedApplicationMapStyle}>
                        {'Click to show expected planning applications.'}
                    </button>
                    :
                    <></>
                }
            </div>
            </DataEntryGroup>
            <DataEntryGroup name="Buildings in community use" collapsed={subcat==null || subcat!="2"}>
            <div className={`alert alert-dark`} role="alert" style={{ fontSize: 13, backgroundColor: "#f6f8f9" }}>
                <i>
                    Here we are collecting information on the location of buildings used for community activities so we can track loss of/additions to community space over time.
                </i>
            </div>
            {(props.mapColourScale != "community_in_public_ownership") ? 
                <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToPublicOwnershipMapStyle}>
                    {'Click to show building ownership status.'}
                </button>
                :
                <></>
            }
            <LogicalDataEntry
                slug='community_activities_current'
                title={dataFields.community_activities_current.title}
                tooltip={dataFields.community_activities_current.tooltip}
                value={props.building.community_activities_current}
                copy={props.copy}
                onChange={props.onChange}
                mode={props.mode}
            />
            <LogicalDataEntry
                slug='community_activities'
                title={dataFields.community_activities.title}
                tooltip={dataFields.community_activities.tooltip}
                value={props.building.community_activities}
                copy={props.copy}
                onChange={props.onChange}
                mode={props.mode}
            />
            <LogicalDataEntry
                slug='community_activities_always'
                title={dataFields.community_activities_always.title}
                tooltip={dataFields.community_activities_always.tooltip}
                value={props.building.community_activities_always}
                copy={props.copy}
                onChange={props.onChange}
                mode={props.mode}
            />
            <SelectDataEntry
                slug='community_public_ownership'
                title={dataFields.community_public_ownership.title}
                value={props.building.community_public_ownership}
                options={dataFields.community_public_ownership.items}
                tooltip={dataFields.community_public_ownership.tooltip}
                onChange={props.onChange}
                mode={props.mode}
                copy={props.copy}
            />
            <Verification
                slug="community_public_ownership"
                allow_verify={props.user !== undefined && props.building.community_public_ownership !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("community_public_ownership")}
                user_verified_as={props.user_verified.community_public_ownership}
                verified_count={props.building.verified.community_public_ownership}
                />
            <MultiDataEntry
                slug='community_public_ownership_sources'
                title={dataFields.community_public_ownership_sources.title}
                tooltip={dataFields.community_public_ownership_sources.tooltip}
                isUrl={true}
                placeholder={'https://...'}
                editableEntries={true}
                value={props.building.community_public_ownership_sources}
                onChange={props.onChange}
                mode={props.mode}
                copy={props.copy}
            />
            <Verification
                slug="community_public_ownership_sources"
                allow_verify={props.user !== undefined && props.building.community_public_ownership_sources !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("community_public_ownership_sources")}
                user_verified_as={props.user_verified.community_public_ownership_sources}
                verified_count={props.building.verified.community_public_ownership_sources}
                />
            </DataEntryGroup>
        </Fragment>
    );
};
const CommunityContainer = withCopyEdit(CommunityView);

export default CommunityContainer;

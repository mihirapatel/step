// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.Collection;
import java.util.List;
import java.util.ArrayList;
import java.util.Set;

public final class FindMeetingQuery {

    public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
        Collection<TimeRange> mandatory_attendees_query = new ArrayList<>();
        Collection<TimeRange> optional_attendees_query = new ArrayList<>();

        // Meeting times with only mandatory attendees
        mandatory_attendees_query = helper(events, request);

        //Meeting times including optional attendees
        Collection<String> mandatory_attendees = request.getAttendees();
        Collection<String> optional_attendees = request.getOptionalAttendees();
        Collection<String> both_attendees = new ArrayList<>();
        both_attendees.addAll(mandatory_attendees);
        both_attendees.addAll(optional_attendees);
        long duration = request.getDuration();
        MeetingRequest request_with_optional = new MeetingRequest(both_attendees, duration);
        optional_attendees_query = helper(events, request_with_optional);
        
        // Return optional query if possible
        if (optional_attendees_query.size() >= 1 || mandatory_attendees.isEmpty()) {
            return optional_attendees_query;
        } else {
            return mandatory_attendees_query;
        }
    }

    public Collection<TimeRange> helper(Collection<Event> events, MeetingRequest request) {
        
        List<TimeRange> query = new ArrayList<>();
        int num_events = events.size();
        int next_available_start = TimeRange.START_OF_DAY;
        int desired_duration = (int)request.getDuration();
        int counter = 0;
        int event_start = 0;
        int event_end = 0;
        Set<String> event_attendees = null;
        Collection<String> request_attendees = request.getAttendees();
        boolean ignore_event = true;

        // Check if duration of event is longer than a whole day
        if ((int)request.getDuration() > TimeRange.WHOLE_DAY.duration()) {
            return query;
        }
        
        // Check if there are any events happening at all
        if (num_events == 0) { 
            query.add(TimeRange.WHOLE_DAY);
            return query;
        }
        for (Event e : events) {

            event_attendees = e.getAttendees();

            //Ignore event only if attendees of this event are not needed in requested meeting
            for (String a : event_attendees) {
                if (request_attendees.contains(a)) {
                    ignore_event = false;
                    break;
                } else if (counter == num_events-1) {
                    query.add(TimeRange.fromStartEnd(next_available_start, TimeRange.END_OF_DAY, true));
                }
            }

            if (!ignore_event) {
                event_start = e.getWhen().start();
                event_end = e.getWhen().end();

                if (event_start == TimeRange.START_OF_DAY) {
                    next_available_start = event_end;
                }

                // Check for overlapping/nested events
                if (event_start < next_available_start) {
                    if (event_end > next_available_start) {
                        next_available_start = event_end;
                    }
                }
                
                //Non-overlapping/non-nested events
                if (next_available_start <= event_start) {
                    if (event_start - next_available_start >= desired_duration) {
                        query.add(TimeRange.fromStartEnd(next_available_start, event_start, false));
                    }
                    next_available_start = event_end; 
                }

                // Last event of the day
                if (counter == num_events-1) {
                    if (next_available_start != TimeRange.END_OF_DAY+1) {
                        query.add(TimeRange.fromStartEnd(next_available_start, TimeRange.END_OF_DAY, true));
                    }
                }
            }
            
            counter += 1;
            ignore_event = true;
        }
        
        return query;
  
    }


}

/*******************************************************************************
 * Copyright 2016 Jalian Systems Pvt. Ltd.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/
package net.sourceforge.marathon.objectmap;

import java.io.Serializable;
import java.util.logging.Logger;

import net.sourceforge.marathon.runtime.api.IPropertyAccessor;

public class OMapRecognitionProperty implements Serializable {

    public static final Logger LOGGER = Logger.getLogger(OMapRecognitionProperty.class.getName());

    private static final long serialVersionUID = 1L;
    private String name;
    private String value;
    private String method;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public boolean isMatch(IPropertyAccessor pa) {
        return pa.isMatched(method, name, value);
    }

    @Override
    public String toString() {
        return "[" + name + ", " + value + ", " + method + "]";
    }

    public static String[] getMethodOptions() {
        return new String[] { IPropertyAccessor.METHOD_CONTAINS, IPropertyAccessor.METHOD_ENDS_WITH,
                IPropertyAccessor.METHOD_EQUALS, IPropertyAccessor.METHOD_EQUALS_IGNORE_CASE, IPropertyAccessor.METHOD_MATCHES,
                IPropertyAccessor.METHOD_STARTS_WITH };
    }
}

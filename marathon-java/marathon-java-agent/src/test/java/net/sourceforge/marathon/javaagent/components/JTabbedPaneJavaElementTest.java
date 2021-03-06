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
package net.sourceforge.marathon.javaagent.components;

import java.awt.BorderLayout;
import java.awt.GridLayout;

import javax.swing.ImageIcon;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTabbedPane;
import javax.swing.SwingConstants;
import javax.swing.SwingUtilities;

import org.testng.AssertJUnit;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import components.TabbedPaneDemo;
import net.sourceforge.marathon.javaagent.IJavaAgent;
import net.sourceforge.marathon.javaagent.IJavaElement;
import net.sourceforge.marathon.javaagent.JavaAgent;
import net.sourceforge.marathon.testhelpers.ComponentUtils;

@Test
public class JTabbedPaneJavaElementTest extends JavaElementTest {

    private IJavaAgent driver;
    protected JFrame frame;
    ImageIcon icon = createImageIcon("images/middle.gif");

    @BeforeMethod
    public void showDialog() throws Throwable {
        SwingUtilities.invokeAndWait(new Runnable() {
            @Override
            public void run() {
                frame = new JFrame(JTableJavaElementTest.class.getSimpleName());
                frame.setName("frame-" + JTableJavaElementTest.class.getSimpleName());
                frame.getContentPane().add(new TabbedPaneDemo(), BorderLayout.CENTER);
                frame.setSize(640, 480);
                frame.setAlwaysOnTop(true);
                frame.setVisible(true);
            }
        });
        driver = new JavaAgent();
    }

    @AfterMethod
    public void disposeDriver() throws Throwable {
        SwingUtilities.invokeAndWait(new Runnable() {
            @Override
            public void run() {
                frame.setVisible(false);
                frame.dispose();
            }
        });
    }

    public void selectATab() throws Throwable {
        IJavaElement tabbedPane = driver.findElementByTagName("tabbed-pane");
        AssertJUnit.assertEquals("0", tabbedPane.getAttribute("selectedIndex"));
        marathon_select(tabbedPane, "Tab 2");
        AssertJUnit.assertEquals("1", tabbedPane.getAttribute("selectedIndex"));
    }

    @Test(expectedExceptions = { RuntimeException.class })
    public void selectAnInvalidTab() throws Throwable {
        IJavaElement tabbedPane = driver.findElementByTagName("tabbed-pane");
        AssertJUnit.assertEquals("0", tabbedPane.getAttribute("selectedIndex"));
        marathon_select(tabbedPane, "Tab 21");
        AssertJUnit.assertEquals("1", tabbedPane.getAttribute("selectedIndex"));
    }

    public void selectTabWithNoText() {
        siw(new Runnable() {

            @Override
            public void run() {
                JTabbedPane tp = (JTabbedPane) ComponentUtils.findComponent(JTabbedPane.class, frame);
                JComponent panel5 = makeTextPanel("Panel #5");
                tp.addTab("", icon, panel5, "is a duplicate");
            }
        });

        IJavaElement tabbedPane = driver.findElementByTagName("tabbed-pane");
        IJavaElement tab = tabbedPane.findElementByCssSelector(".::nth-tab(5)");
        tab.click();
        AssertJUnit.assertEquals("4", tabbedPane.getAttribute("selectedIndex"));
        AssertJUnit.assertEquals("middle", tab.getText());

    }

    public void selectTabWithNoIconAndText() {
        siw(new Runnable() {

            @Override
            public void run() {
                JTabbedPane tp = (JTabbedPane) ComponentUtils.findComponent(JTabbedPane.class, frame);
                JComponent panel5 = makeTextPanel("Panel #5");
                tp.addTab("", null, panel5, "is a duplicate");
            }
        });

        IJavaElement tabbedPane = driver.findElementByTagName("tabbed-pane");
        IJavaElement tab = tabbedPane.findElementByCssSelector(".::nth-tab(5)");
        tab.click();
        AssertJUnit.assertEquals("4", tabbedPane.getAttribute("selectedIndex"));
        AssertJUnit.assertEquals("tabIndex-4", tab.getText());

    }

    public void selectDuplicateTab() {
        siw(new Runnable() {

            @Override
            public void run() {
                JTabbedPane tp = (JTabbedPane) ComponentUtils.findComponent(JTabbedPane.class, frame);
                JComponent panel5 = makeTextPanel("Panel #5");
                tp.addTab("Tab 2", icon, panel5, "is a duplicate");
            }
        });
        IJavaElement tabbedPane = driver.findElementByTagName("tabbed-pane");
        IJavaElement tab1 = tabbedPane.findElementByCssSelector(".::nth-tab(2)");
        tab1.click();
        AssertJUnit.assertEquals("1", tabbedPane.getAttribute("selectedIndex"));
        AssertJUnit.assertEquals("Tab 2", tab1.getText());

        IJavaElement tab2 = tabbedPane.findElementByCssSelector(".::nth-tab(5)");
        tab2.click();
        AssertJUnit.assertEquals("4", tabbedPane.getAttribute("selectedIndex"));
        AssertJUnit.assertEquals("Tab 2(1)", tab2.getText());
    }

    public void selectTabWithMultipleDuplicates() {
        siw(new Runnable() {

            @Override
            public void run() {
                JTabbedPane tp = (JTabbedPane) ComponentUtils.findComponent(JTabbedPane.class, frame);
                tp.addTab("Tab 2", icon, makeTextPanel("Panel #5"), "is a duplicate");
                tp.addTab("Tab 2", icon, makeTextPanel("Panel #6"), "is a duplicate");
            }
        });
        IJavaElement tabbedPane = driver.findElementByTagName("tabbed-pane");
        IJavaElement tab1 = tabbedPane.findElementByCssSelector(".::nth-tab(2)");
        tab1.click();
        AssertJUnit.assertEquals("1", tabbedPane.getAttribute("selectedIndex"));
        AssertJUnit.assertEquals("Tab 2", tab1.getText());

        IJavaElement tab2 = tabbedPane.findElementByCssSelector(".::nth-tab(5)");
        tab2.click();
        AssertJUnit.assertEquals("4", tabbedPane.getAttribute("selectedIndex"));
        AssertJUnit.assertEquals("Tab 2(1)", tab2.getText());

        IJavaElement tab3 = tabbedPane.findElementByCssSelector(".::nth-tab(6)");
        tab3.click();
        AssertJUnit.assertEquals("5", tabbedPane.getAttribute("selectedIndex"));
        AssertJUnit.assertEquals("Tab 2(2)", tab3.getText());
    }

    protected static ImageIcon createImageIcon(String path) {
        java.net.URL imgURL = TabbedPaneDemo.class.getResource(path);
        if (imgURL != null) {
            return new ImageIcon(imgURL);
        } else {
            System.err.println("Couldn't find file: " + path);
            return null;
        }
    }

    protected JComponent makeTextPanel(String text) {
        JPanel panel = new JPanel(false);
        JLabel filler = new JLabel(text);
        filler.setHorizontalAlignment(SwingConstants.CENTER);
        panel.setLayout(new GridLayout(1, 1));
        panel.add(filler);
        return panel;
    }

    public void assertContent() {
        IJavaElement tabbedPane = driver.findElementByTagName("tabbed-pane");
        AssertJUnit.assertEquals("[[\"Tab 1\",\"Tab 2\",\"Tab 3\",\"Tab 4\"]]", tabbedPane.getAttribute("content"));
    }

    public void assertContentWithDuplicates() {
        IJavaElement tabbedPane = driver.findElementByTagName("tabbed-pane");
        siw(new Runnable() {
            @Override
            public void run() {
                JTabbedPane tp = (JTabbedPane) ComponentUtils.findComponent(JTabbedPane.class, frame);
                tp.setTitleAt(2, "Tab 2");
            }
        });
        AssertJUnit.assertEquals("[[\"Tab 1\",\"Tab 2\",\"Tab 2(1)\",\"Tab 4\"]]", tabbedPane.getAttribute("content"));
    }

    public void assertContentWithMultipleDuplicates() {
        IJavaElement tabbedPane = driver.findElementByTagName("tabbed-pane");
        siw(new Runnable() {
            @Override
            public void run() {
                JTabbedPane tp = (JTabbedPane) ComponentUtils.findComponent(JTabbedPane.class, frame);
                tp.setTitleAt(2, "Tab 2");
                tp.setTitleAt(3, "Tab 2");
            }
        });
        AssertJUnit.assertEquals("[[\"Tab 1\",\"Tab 2\",\"Tab 2(1)\",\"Tab 2(2)\"]]", tabbedPane.getAttribute("content"));
    }
}

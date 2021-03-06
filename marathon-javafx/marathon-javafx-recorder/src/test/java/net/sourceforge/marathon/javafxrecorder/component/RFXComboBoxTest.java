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
package net.sourceforge.marathon.javafxrecorder.component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.testng.AssertJUnit;
import org.testng.annotations.Test;

import ensemble.samples.controls.ComboBoxSample;
import javafx.application.Platform;
import javafx.scene.Node;
import javafx.scene.control.ComboBox;
import javafx.scene.layout.Pane;
import net.sourceforge.marathon.javafxagent.Wait;
import net.sourceforge.marathon.javafxrecorder.component.LoggingRecorder.Recording;

public class RFXComboBoxTest extends RFXComponentTest {

    @Test
    public void getDefaultSelection() {
        ComboBox<?> comboBox = (ComboBox<?>) getPrimaryStage().getScene().getRoot().lookup(".combo-box");
        LoggingRecorder lr = new LoggingRecorder();
        Platform.runLater(() -> {
            RFXComboBox rfxComboBoxBase = new RFXComboBox(comboBox, null, null, lr);
            comboBox.getSelectionModel().select(0);
            rfxComboBoxBase.focusLost(null);
        });
        List<Recording> recordings = lr.waitAndGetRecordings(1);
        Recording recording = recordings.get(0);
        AssertJUnit.assertEquals("recordSelect", recording.getCall());
        AssertJUnit.assertEquals("Option 1", recording.getParameters()[0]);
    }

    @Test
    public void selectOption() {
        ComboBox<?> comboBox = (ComboBox<?>) getPrimaryStage().getScene().getRoot().lookup(".combo-box");
        LoggingRecorder lr = new LoggingRecorder();
        Platform.runLater(() -> {
            RFXComboBox rfxComboBoxBase = new RFXComboBox(comboBox, null, null, lr);
            comboBox.getSelectionModel().select(1);
            rfxComboBoxBase.focusLost(null);
        });
        List<Recording> recordings = lr.waitAndGetRecordings(1);
        Recording recording = recordings.get(0);
        AssertJUnit.assertEquals("recordSelect", recording.getCall());
        AssertJUnit.assertEquals("Option 2", recording.getParameters()[0]);
    }

    @Test
    public void selectOptionWithQuotes() {
        @SuppressWarnings("unchecked")
        ComboBox<String> comboBox = (ComboBox<String>) getPrimaryStage().getScene().getRoot().lookup(".combo-box");
        LoggingRecorder lr = new LoggingRecorder();
        Platform.runLater(() -> {
            RFXComboBox rfxComboBoxBase = new RFXComboBox(comboBox, null, null, lr);
            comboBox.getItems().add(" \"Option 13\" ");
            comboBox.getSelectionModel().select(" \"Option 13\" ");
            rfxComboBoxBase.focusLost(null);
        });
        List<Recording> recordings = lr.waitAndGetRecordings(1);
        Recording recording = recordings.get(0);
        AssertJUnit.assertEquals("recordSelect", recording.getCall());
        AssertJUnit.assertEquals(" \"Option 13\" ", recording.getParameters()[0]);
    }

    @Test
    public void htmlOptionSelect() {
        @SuppressWarnings("unchecked")
        ComboBox<String> comboBox = (ComboBox<String>) getPrimaryStage().getScene().getRoot().lookup(".combo-box");
        LoggingRecorder lr = new LoggingRecorder();
        String text = "This is a test text";
        final String htmlText = "<html><font color=\"RED\"><h1><This is also content>" + text + "</h1></html>";
        Platform.runLater(() -> {
            RFXComboBox rfxComboBoxBase = new RFXComboBox(comboBox, null, null, lr);
            comboBox.getItems().add(htmlText);
            comboBox.getSelectionModel().select(htmlText);
            rfxComboBoxBase.focusLost(null);
        });
        List<Recording> recordings = lr.waitAndGetRecordings(1);
        Recording recording = recordings.get(0);
        AssertJUnit.assertEquals("recordSelect", recording.getCall());
        AssertJUnit.assertEquals(text, recording.getParameters()[0]);
    }

    @Test
    public void selectDuplicateOption() {
        @SuppressWarnings("unchecked")
        ComboBox<String> comboBox = (ComboBox<String>) getPrimaryStage().getScene().getRoot().lookup(".combo-box");
        LoggingRecorder lr = new LoggingRecorder();
        Platform.runLater(() -> {
            RFXComboBox rfxComboBoxBase = new RFXComboBox(comboBox, null, null, lr);
            comboBox.getSelectionModel().select(1);
            rfxComboBoxBase.focusLost(null);
        });
        List<Recording> recordings = lr.waitAndGetRecordings(1);
        Recording recording = recordings.get(0);
        AssertJUnit.assertEquals("recordSelect", recording.getCall());
        AssertJUnit.assertEquals("Option 2", recording.getParameters()[0]);

        Platform.runLater(() -> {
            RFXComboBox rfxComboBoxBase = new RFXComboBox(comboBox, null, null, lr);
            comboBox.getItems().add(2, "Option 2");
            comboBox.getSelectionModel().select(2);
            rfxComboBoxBase.focusLost(null);
        });
        recordings = lr.waitAndGetRecordings(2);
        recording = recordings.get(1);
        AssertJUnit.assertEquals("recordSelect", recording.getCall());
        AssertJUnit.assertEquals("Option 2(1)", recording.getParameters()[0]);
    }

    @Test
    public void selectMultipleDuplicateOption() {
        @SuppressWarnings("unchecked")
        ComboBox<String> comboBox = (ComboBox<String>) getPrimaryStage().getScene().getRoot().lookup(".combo-box");
        LoggingRecorder lr = new LoggingRecorder();
        Platform.runLater(() -> {
            RFXComboBox rfxComboBoxBase = new RFXComboBox(comboBox, null, null, lr);
            comboBox.getSelectionModel().select(1);
            rfxComboBoxBase.focusLost(null);
        });
        List<Recording> recordings = lr.waitAndGetRecordings(1);
        Recording recording = recordings.get(0);
        AssertJUnit.assertEquals("recordSelect", recording.getCall());
        AssertJUnit.assertEquals("Option 2", recording.getParameters()[0]);

        Platform.runLater(() -> {
            RFXComboBox rfxComboBoxBase = new RFXComboBox(comboBox, null, null, lr);
            comboBox.getItems().add(2, "Option 2");
            comboBox.getItems().add(5, "Option 2");
            comboBox.getSelectionModel().select(5);
            rfxComboBoxBase.focusLost(null);
        });
        recordings = lr.waitAndGetRecordings(2);
        recording = recordings.get(1);
        AssertJUnit.assertEquals("recordSelect", recording.getCall());
        AssertJUnit.assertEquals("Option 2(2)", recording.getParameters()[0]);
    }

    @Test
    public void selectEditorFromOption() {
        Set<Node> comboBoxNodes = getPrimaryStage().getScene().getRoot().lookupAll(".combo-box");
        List<Node> boxes = new ArrayList<>(comboBoxNodes);
        ComboBox<?> comboBox = (ComboBox<?>) boxes.get(1);
        LoggingRecorder lr = new LoggingRecorder();
        Platform.runLater(() -> {
            RFXComboBox rfxComboBoxBase = new RFXComboBox(comboBox, null, null, lr);
            comboBox.getSelectionModel().select(1);
            comboBox.getEditor().setText("Opt");
            rfxComboBoxBase.focusLost(null);
        });
        List<Recording> recordings = lr.waitAndGetRecordings(1);
        Recording recording = recordings.get(0);
        AssertJUnit.assertEquals("recordSelect", recording.getCall());
        AssertJUnit.assertEquals("Opt", recording.getParameters()[0]);
    }

    @Test
    public void selectEditorOption() {
        Set<Node> comboBoxNodes = getPrimaryStage().getScene().getRoot().lookupAll(".combo-box");
        List<Node> boxes = new ArrayList<>(comboBoxNodes);
        ComboBox<?> comboBox = (ComboBox<?>) boxes.get(1);
        LoggingRecorder lr = new LoggingRecorder();
        Platform.runLater(() -> {
            RFXComboBox rfxComboBoxBase = new RFXComboBox(comboBox, null, null, lr);
            comboBox.getEditor().setText("Option 2");
            rfxComboBoxBase.focusLost(null);
        });
        List<Recording> recordings = lr.waitAndGetRecordings(1);
        Recording recording = recordings.get(0);
        AssertJUnit.assertEquals("recordSelect", recording.getCall());
        AssertJUnit.assertEquals("Option 2", recording.getParameters()[0]);
    }

    @Test
    public void selectEditorEmptyTextOption() {
        Set<Node> comboBoxNodes = getPrimaryStage().getScene().getRoot().lookupAll(".combo-box");
        List<Node> boxes = new ArrayList<>(comboBoxNodes);
        ComboBox<?> comboBox = (ComboBox<?>) boxes.get(1);
        LoggingRecorder lr = new LoggingRecorder();
        Platform.runLater(() -> {
            RFXComboBox rfxComboBoxBase = new RFXComboBox(comboBox, null, null, lr);
            comboBox.getEditor().setText("");
            rfxComboBoxBase.focusLost(null);
        });
        List<Recording> recordings = lr.waitAndGetRecordings(1);
        Recording recording = recordings.get(0);
        AssertJUnit.assertEquals("recordSelect", recording.getCall());
        AssertJUnit.assertEquals("", recording.getParameters()[0]);
    }

    @Test
    public void getText() {
        ComboBox<?> comboBox = (ComboBox<?>) getPrimaryStage().getScene().getRoot().lookup(".combo-box");
        LoggingRecorder lr = new LoggingRecorder();
        List<String> text = new ArrayList<>();
        Platform.runLater(() -> {
            RFXComboBox rfxComboBoxBase = new RFXComboBox(comboBox, null, null, lr);
            comboBox.getSelectionModel().select(1);
            rfxComboBoxBase.focusLost(null);
            text.add(rfxComboBoxBase._getText());
        });
        new Wait("Waiting for combo box text.") {
            @Override
            public boolean until() {
                return text.size() > 0;
            }
        };
        AssertJUnit.assertEquals("Option 2", text.get(0));
    }

    @Override
    protected Pane getMainPane() {
        return new ComboBoxSample();
    }
}

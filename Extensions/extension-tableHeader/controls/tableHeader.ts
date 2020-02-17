
import * as app from 'tns-core-modules/application';
import { IView } from './IView';
import { IControl } from './controls/IControl';
import { BaseObservable } from './observables/BaseObservable';

export class tableHeaderInfo extends IControl {

    private _headerInfo: any;
    private _headerRow: any;
    private _labelSKU: any;
    private _lablelDocQty: any;
    private _labelScanQty: any;
    private _observable: BaseObservable;
    
    public initialize(props) {
        super.initialize(props);
        if (app.android) {
            this._headerInfo = new android.widget.TableLayout(this.androidContext());
            this._headerRow = new android.widget.TableRow(this.androidContext());
            this._labelSKU = new android.widget.TextView(this.androidContext());
            this._labelSKU.setText("SKU No.");
            this._lablelDocQty = new android.widget.TextView(this.androidContext());
            this._lablelDocQty.setText("Doc Qty");
            this._labelScanQty = new android.widget.TextView(this.androidContext());
            this._labelScanQty.setText("Scan Qty");

            this._headerRow.addView(this._labelSKU);
            this._headerRow.addView(this._lablelDocQty);
            this._headerRow.addView(this._labelScanQty);
            this._headerInfo.addView(this._headerRow);
        }
    }
    public view() {
        if (app.android) {
            return this._headerInfo;
        }
    }
    public viewIsNative() {
        return true;
    }

    public observable() {
        if (!this._observable) {
            this._observable = new BaseObservable(this, this.definition(), this.page());
        }
        return this._observable;
    }

    public setContainer(container: IControl) {
        // do nothing
    }

    public setValue(value: any, notify: boolean, isTextValue?: boolean): Promise<any> {
        // do nothing
        return Promise.resolve();
    }
}